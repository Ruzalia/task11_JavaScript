/**
 * Created by Ruzaliia_Yakunina on 12/24/2016.
 */
var productId = String("");

var navigationCss = ".lego-global-navigation";
var productsIconCss = ".gn-icon-products";
var productsTitleCss = ".hgroup h2";
var firstProductCss = "li:nth-child(1) .primary-content img";
var navigationForProductCss = ".site-navigation";
var productsTabXpath = "//li[@class=' has-icon has-title']//span[text()='Products']";
var firstProductItemCss = ".list li:nth-child(1) a.product";
var productIdXpath = "//header//*[@itemprop='identifier']";
var listOfButtonsForProductItemCss = ".list-inline";

var cartIconCss = ".icon-shopping-cart-filled";
var confirmAddToCartXpath = "//a[contains(text(), 'CONTINUE')]";
var addToCartButtonCss = ".overview__wrapper button.add-to-cart-button";
var cartInHeaderCss = "#util-bar-dropdown-cart a.dropdown__trigger";
var cartDropdownCss = ".dropdown__content-wrapper";
var cartItemCodeCss = ".cart-item__code";

var addToWishlistButtonCss = ".overview__wrapper button.add-to-wishlist-button";
var wishlistInHeaderCss = ".util-bar__link-wishlist";
var wishlistBlockHeaderCss = ".wishlist-header__title";
var wishlistItemCodeCss = ".wishlist-item__code";

var BeforeTest = function () {
    this.chooseProduct = function () {
        describe("Choose random product", function () {
            it("Go to main page", function () {
                browser.manage().window().maximize();
                browser.get("https://www.lego.com/en-us");
                browser.waitForAngular();
                expect(element(by.css(navigationCss)).isDisplayed()).toBe(true);
            });
            it("Click on Products icon", function () {
                element(by.css(productsIconCss)).click();
                browser.waitForAngular();
                expect(element(by.css(productsTitleCss)).getText()).toBe("Products");
            });
            it("Click on random product", function () {
                element(by.css(firstProductCss)).click();
                browser.waitForAngular();
                browser.wait(protractor.ExpectedConditions.visibilityOf(element(by.css(navigationForProductCss))), 7000);
                expect(element(by.css(navigationForProductCss)).isDisplayed()).toBe(true);
            });
            it("Select Products tab", function () {
                element(by.xpath(productsTabXpath)).click();
                browser.waitForAngular();
                expect(element(by.css(firstProductItemCss)).isDisplayed()).toBe(true);
            });
            it("Choose random product item", function () {
                element(by.css(firstProductItemCss)).click();
                browser.waitForAngular();
                productId = element(by.xpath(productIdXpath)).getText();
                expect(element(by.css(listOfButtonsForProductItemCss)).isDisplayed()).toBe(true);
            });
            it("Click on button with cart icon", function () {
                element(by.css(cartIconCss)).click();
                browser.ignoreSynchronization = true;
                browser.waitForAngular();
                browser.wait(protractor.ExpectedConditions.elementToBeClickable(element(by.xpath(confirmAddToCartXpath))), 7000);
                element(by.xpath(confirmAddToCartXpath)).click();
                browser.ignoreSynchronization = true;
                browser.waitForAngular();
                browser.wait(protractor.ExpectedConditions.presenceOf(element(by.css(addToCartButtonCss))), 7000);
                expect(element(by.css(addToCartButtonCss)).isDisplayed()).toBe(true);
            });
        });
    };
    return;
};

describe("Adding item into the cart feature", function () {
    describe(" - Check If product can be added into the cart - ", function () {
        var before = new BeforeTest();
        before.chooseProduct();

        it("Click on Add to Bag button", function () {
            element(by.css(addToCartButtonCss)).click();
            browser.ignoreSynchronization = true;
            browser.waitForAngular();
            expect(element(by.css(cartInHeaderCss)).isDisplayed()).toBe(true);
        });
        it("Click on My Bag button on Header", function () {
            element(by.css(cartInHeaderCss)).click();
            browser.ignoreSynchronization = true;
            browser.waitForAngular();
            expect(element(by.css(cartDropdownCss)).isDisplayed()).toBe(true);
        });
        it("Check if item is displayed in My Bag tab", function () {
            browser.wait(protractor.ExpectedConditions.visibilityOf(element(by.css(cartItemCodeCss))), 7000);
            expect(element(by.css(cartItemCodeCss)).getAttribute("textContent")).toBe(productId);
        });

    });
});

describe("Adding item into the wishlist feature", function () {
    describe(" - Check If product can be added into the wishlist - ", function () {
        var before = new BeforeTest();
        before.chooseProduct();

        it("Click on Add to Wishlist button", function () {
            element(by.css(addToWishlistButtonCss)).click();
            browser.ignoreSynchronization = true;
            browser.waitForAngular();
            expect(element(by.css(wishlistInHeaderCss)).isDisplayed()).toBe(true);
        });
        it("Click on Wish List button on Header", function () {
            element(by.css(wishlistInHeaderCss)).click();
            browser.ignoreSynchronization = true;
            browser.waitForAngular();
            expect(element(by.css(wishlistBlockHeaderCss)).isDisplayed()).toBe(true);
        });
        it("Check if item is displayed in Wish List tab", function () {
            browser.wait(protractor.ExpectedConditions.visibilityOf(element(by.css(wishlistItemCodeCss))), 7000);
            expect(element(by.css(wishlistItemCodeCss)).getAttribute("textContent")).toBe(productId);
        });
    });
});