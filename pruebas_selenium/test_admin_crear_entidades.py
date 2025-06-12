from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select
import pytest
import time

# Configuración base
@pytest.fixture
def browser():
    driver = webdriver.Chrome()
    driver.implicitly_wait(10)
    yield driver
    driver.quit()

# Helpers de autenticación
def admin_login(browser):
    browser.get('http://localhost:3000/login')
    browser.find_element(By.ID, 'email').send_keys('admin@colori.com')
    browser.find_element(By.ID, 'password').send_keys('admin123')
    browser.find_element(By.XPATH, '//button[@type="submit"]').click()

# Prueba de creación de usuario
def test_crear_usuario_admin(browser):
    admin_login(browser)
    
    # Navegar a gestión de usuarios
    browser.find_element(By.LINK_TEXT, 'Usuarios').click()
    browser.find_element(By.XPATH, '//button//span[contains(text(),"Crear Usuario")]').click()
    
    # Llenar formulario
    # Sección Información Básica
    # Campos del formulario
    WebDriverWait(browser, 10).until(
        EC.presence_of_element_located((By.NAME, 'firstName'))
    ).send_keys('Test')

    browser.find_element(By.NAME, 'lastName').send_keys('User')
    browser.find_element(By.NAME, 'email').send_keys('test@example.com')

        # Interactuar con el dropdown
    dropdown_button = WebDriverWait(browser, 10).until(
        EC.element_to_be_clickable((By.XPATH, '//button[@role="combobox" and contains(., "Mesero")]'))
    )
    dropdown_button.click()

    # Seleccionar la opción
    WebDriverWait(browser, 10).until(
        EC.visibility_of_element_located((By.XPATH, '//div[@role="option"]//span[text()="Mesero"]'))
    ).click()

    browser.find_element(By.NAME, 'password').send_keys('test123')
    
    # Sección Configuración
    # Campos de configuración
    username_input = WebDriverWait(browser, 10).until(
        EC.presence_of_element_located((By.NAME, 'name'))
    )
    username_input.send_keys('test_user')

    # Espera a que el <input name="description"> esté clickable
    desc_input = WebDriverWait(browser, 10).until(
        EC.element_to_be_clickable((By.CSS_SELECTOR, "input[name='description']"))
    )

    # Asegúrate de que esté en viewport
    browser.execute_script("arguments[0].scrollIntoView(true);", desc_input)

    # (Opcional) Haz click para enfocar y limpia cualquier valor previo
    desc_input.click()
    desc_input.clear()

    # Envía el texto
    desc_input.send_keys('Usuario de prueba')

        # En lugar de By.ID('password'), busca el input dentro del diálogo por su name
    password_input = WebDriverWait(browser, 10).until(
        EC.element_to_be_clickable((
            By.CSS_SELECTOR,
            "div[role='dialog'] input[name='password']"
        ))
    )

    # Asegúrate de que esté a la vista y enfocado
    browser.execute_script("arguments[0].scrollIntoView(true);", password_input)
    password_input.click()
    password_input.clear()

    # Envía la contraseña deseada
    password_input.send_keys('password123')
    
    # Botones de acción
    browser.find_element(By.XPATH, '//button[contains(text(),"Crear Usuario")]').click()

        # … después de verificar el toast de creación (o justo tras el click de Crear Usuario)
    
    time.sleep(3)

        # 1. Abre el menú de acciones (ellipsis)
    menu_btn = WebDriverWait(browser, 10).until(
        EC.element_to_be_clickable((
            By.CSS_SELECTOR,
            "td[data-slot='table-cell'] button[aria-haspopup='menu']"
        ))
    )
    menu_btn.click()

    time.sleep(3)

    # 2. Espera a que el menú (div[role=menu]) sea visible
    WebDriverWait(browser, 10).until(
        EC.visibility_of_element_located((By.CSS_SELECTOR, "div[role='menu']"))
    )

    time.sleep(1)

    # 3. Dentro de ese menú, busca el ítem con role="menuitem" y texto "Delete"
    delete_item = WebDriverWait(browser, 10).until(
        EC.element_to_be_clickable((
            By.XPATH,
            "//*[@role='menuitem' and normalize-space(.)='Delete']"
        ))
    )
    delete_item.click()
    time.sleep(1)
    # 4. Espera al modal de confirmación y haz click en “Eliminar Usuario” (ajusta el texto si aparece en inglés)
    confirm_btn = WebDriverWait(browser, 10).until(
        EC.element_to_be_clickable((
            By.XPATH,
            "//div[@role='dialog']//button[normalize-space(.)='Eliminar Usuario']"
        ))
    )
    confirm_btn.click()



if __name__ == "__main__":
    pytest.main([__file__])
