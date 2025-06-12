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


def test_crear_eliminar_categoria(browser):
    unique_id     = str(int(time.time()))
    category_name = f"Categoría Test {unique_id}"
    category_desc = "Descripción de prueba"
    slug_value    = f"categoria-test-{unique_id}"
    display_order = "1"

    # 1) Login y navegar a Categorías
    admin_login(browser)
    browser.find_element(By.LINK_TEXT, "Categorías").click()
    WebDriverWait(browser, 10).until(
        EC.presence_of_element_located((
            By.XPATH, "//h1[contains(text(),'Gestión de Categorías')]"
        ))
    )

    # 2) Abrir modal Crear Categoría
    WebDriverWait(browser, 10).until(
        EC.element_to_be_clickable((
            By.XPATH,
            "//button//span[contains(text(),'Crear Categoría')]"
        ))
    ).click()

    # 3) Rellenar formulario con TABs
    name_input = WebDriverWait(browser, 10).until(
        EC.element_to_be_clickable((By.NAME, "name"))
    )
    name_input.click()
    time.sleep(0.3)

    # Nombre y descripción
    send_text(browser, category_name)
    send_tab(browser, 1)
    send_text(browser, category_desc)

    # Variante de Color (dropdown)
    send_tab(browser, 1)
    ActionChains(browser).send_keys(Keys.ARROW_DOWN).send_keys(Keys.ENTER).perform()

    # URL Amigable (Slug)
    send_tab(browser, 1)
    ActionChains(browser).key_down(Keys.CONTROL).send_keys("a").key_up(Keys.CONTROL) \
                     .pause(0.3).send_keys(slug_value).perform()

    # Términos de Búsqueda Adicionales
    send_tab(browser, 1)
    send_text(browser, "test")
    ActionChains(browser).send_keys(Keys.ENTER).perform()

    # Icono
    send_tab(browser, 1)
    ActionChains(browser).send_keys(Keys.ARROW_DOWN).send_keys(Keys.ENTER).perform()

    # Orden de Visualización
    send_tab(browser, 1)
    send_text(browser, display_order)

    # Productos Asociados y toggle Activo
    send_tab(browser, 2)
    ActionChains(browser).send_keys(Keys.SPACE).perform()

    # 4) Click en Crear Categoría
    create_btn = WebDriverWait(browser, 10).until(
        EC.element_to_be_clickable((
            By.XPATH,
            "//div[@role='dialog']//button[contains(., 'Crear Categoría')]"
        ))
    )
    create_btn.click()

    # 5) Esperar cierre del modal
    WebDriverWait(browser, 10).until(
        EC.invisibility_of_element_located((By.CSS_SELECTOR, "div[role='dialog']"))
    )

    # 6) Eliminar la categoría creando
    # 6.1) Abrir menú de acciones en la primera fila
    menu_btn = WebDriverWait(browser, 10).until(
        EC.element_to_be_clickable((
            By.CSS_SELECTOR,
            "td[data-slot='table-cell'] button[aria-haspopup='menu']"
        ))
    )
    menu_btn.click()

    # 6.2) Esperar menú y clicar 'Delete'
    WebDriverWait(browser, 10).until(
        EC.visibility_of_element_located((By.CSS_SELECTOR, "div[role='menu']"))
    )
    delete_item = WebDriverWait(browser, 10).until(
        EC.element_to_be_clickable((
            By.XPATH,
            "//*[@role='menuitem' and normalize-space(.)='Delete']"
        ))
    )
    delete_item.click()

    # 7) Confirmar eliminación
    confirm_btn = WebDriverWait(browser, 5).until(
        EC.element_to_be_clickable((
            By.XPATH,
            "//div[@role='dialog']//button[normalize-space(.)='Eliminar Categoría']"
        ))
    )
    confirm_btn.click()

    # 8) Esperar cierre de confirmación
    WebDriverWait(browser, 5).until(
        EC.invisibility_of_element_located((
            By.XPATH,
            "//div[@role='dialog']//button[normalize-space(.)='Eliminar Categoría']"
        ))
    )

    print(f"✅ Categoría '{category_name}' creada y eliminada correctamente.")


if __name__ == "__main__":
    pytest.main([__file__])
