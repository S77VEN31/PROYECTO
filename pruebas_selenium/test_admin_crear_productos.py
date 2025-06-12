import time
import pytest

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def send_text(browser, text, pause=0.3):
    ActionChains(browser).send_keys(text).pause(pause).perform()

def send_tab(browser, count=1, pause=0.3):
    for _ in range(count):
        ActionChains(browser).send_keys(Keys.TAB).pause(pause).perform()

@pytest.fixture
def browser():
    driver = webdriver.Chrome()
    driver.implicitly_wait(10)
    driver.maximize_window()
    yield driver
    driver.quit()

def admin_login(browser):
    browser.get("http://localhost:3000/login")
    WebDriverWait(browser, 10).until(
        EC.element_to_be_clickable((By.ID, "email"))
    ).send_keys("admin@colori.com")
    browser.find_element(By.ID, "password").send_keys("admin123")
    browser.find_element(By.XPATH, "//button[@type='submit']").click()
    WebDriverWait(browser, 10).until(EC.url_contains("/admin"))


def test_crear_eliminar_producto_con_tab(browser):
    unique_id     = str(int(time.time()))
    product_name  = f"Producto Test {unique_id}"
    product_desc  = "Descripción de prueba para el producto"
    slug_value    = f"producto-test-{unique_id}"
    product_price = "5000"
    product_prep  = "15"
    calories      = "200"
    proteins      = "10"
    carbs         = "30"
    fats          = "5"

    # 1) Login y navegar a Productos
    admin_login(browser)
    browser.find_element(By.LINK_TEXT, "Productos").click()
    WebDriverWait(browser, 10).until(
        EC.presence_of_element_located((By.XPATH, "//h1[contains(text(),'Gestión de Productos')]") )
    )

    # 2) Abrir modal Crear Producto
    WebDriverWait(browser, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//button//span[contains(text(),'Crear Producto')]") )
    ).click()

    # 3) Rellenar formulario con TABs
    name_input = WebDriverWait(browser, 10).until(
        EC.element_to_be_clickable((By.NAME, "name"))
    )
    name_input.click()
    time.sleep(0.3)

    send_text(browser, product_name)
    send_tab(browser, 1); send_text(browser, product_desc)
    send_tab(browser, 2)
    ActionChains(browser).key_down(Keys.CONTROL).send_keys("a").key_up(Keys.CONTROL) \
                        .pause(0.3).send_keys(slug_value).perform()
    send_tab(browser, 2); send_text(browser, product_price)
    send_tab(browser, 1); send_text(browser, product_prep)
    send_tab(browser, 2)  # skip etiquetas
    send_tab(browser, 1); send_text(browser, calories)
    send_tab(browser, 1); send_text(browser, proteins)
    send_tab(browser, 1); send_text(browser, carbs)
    send_tab(browser, 1); send_text(browser, fats)
    send_tab(browser, 2)

    # 4) Click en Crear Producto
    create_btn = WebDriverWait(browser, 10).until(
        EC.element_to_be_clickable((
            By.XPATH,
            "//div[@role='dialog']//button[@type='submit' and contains(., 'Crear Producto')]"
        ))
    )
    browser.execute_script("arguments[0].scrollIntoView({block:'center'});", create_btn)
    time.sleep(0.3)
    create_btn.click()

    # 5) Esperar cierre del modal
    WebDriverWait(browser, 10).until(
        EC.invisibility_of_element_located((By.CSS_SELECTOR, "div[role='dialog']"))
    )

    # 6) Buscar el producto
    time.sleep(1)
    search = WebDriverWait(browser, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//input[contains(@placeholder, 'Buscar productos')]") )
    )
    browser.execute_script("arguments[0].focus(); arguments[0].value = '';", search)
    search.send_keys(product_name, Keys.ENTER)

    # 7) Abrir y usar menú sin verificar aparición del producto
    # 1. Abre el menú de acciones (ellipsis)
    menu_btn = WebDriverWait(browser, 10).until(
        EC.element_to_be_clickable((
            By.CSS_SELECTOR,
            "td[data-slot='table-cell'] button[aria-haspopup='menu']"
        ))
    )
    menu_btn.click()

    time.sleep(1)

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

    # 8) Confirmar eliminación
    confirm_btn = WebDriverWait(browser, 5).until(
        EC.element_to_be_clickable((
            By.XPATH,
            "//div[@role='dialog']//button[normalize-space(.)='Eliminar Producto']"
        ))
    )
    confirm_btn.click()

    # 9) Esperar cierre del diálogo de confirmación
    WebDriverWait(browser, 5).until(
        EC.invisibility_of_element_located((
            By.XPATH,
            "//div[@role='dialog']//button[normalize-space(.)='Eliminar Producto']"
        ))
    )

    # 10) Verificar que ya no aparece en la lista
    time.sleep(1)
    search.clear()
    search.send_keys(product_name, Keys.ENTER)
    WebDriverWait(browser, 5).until(
        EC.presence_of_element_located((By.XPATH, "//p[contains(text(),'No se encontraron productos')]") )
    )

    print(f"✅ Producto '{product_name}' creado y eliminado correctamente via menú de acciones.")


if __name__ == "__main__":
    pytest.main([__file__])
