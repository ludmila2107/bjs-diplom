let logoutButton = new LogoutButton();

logoutButton.action = function log() {
    ApiConnector.logout((response) =>
        response.success == true ? location.reload() : console.log("привет!")
    );
};

ApiConnector.current((response) => {
    response.success == true ?
        ProfileWidget.showProfile(response.data) :
        console.log("привет!");
});

let board = new RatesBoard();

function getCurrency() {
    ApiConnector.getStocks((callback) => {
        if (callback.success == true) {
            board.clearTable();
            board.fillTable(callback.data);
        }
    });
}
getCurrency();
setInterval(getCurrency, 1000);

let manageMoney = new MoneyManager();

manageMoney.addMoneyCallback = function f({
    currency,
    amount
}) {
    ApiConnector.addMoney({
        currency,
        amount
    }, (callback) => {
        if (callback.success == true) {
            ProfileWidget.showProfile(callback.data);
            console.log(callback.data);
            manageMoney.setMessage(callback.success, "Успешно");
        } else {
            manageMoney.setMessage(callback.success, callback.error);
        }
    });
};

manageMoney.conversionMoneyCallback = function convert({
    fromCurrency,
    targetCurrency,
    fromAmount,
}) {
    ApiConnector.convertMoney({
        fromCurrency,
        targetCurrency,
        fromAmount
    }, (callback) => {
        if (callback.success == true) {
            ProfileWidget.showProfile(callback.data);
            manageMoney.setMessage(callback.success, "Успешно");
        } else {
            manageMoney.setMessage(callback.success, callback.error);
        }
    });
};

manageMoney.sendMoneyCallback = function transfer({
    to,
    currency,
    amount
}) {
    ApiConnector.transferMoney({
        to,
        currency,
        amount
    }, (callback) => {
        if (callback.success == true) {
            ProfileWidget.showProfile(callback.data);
            manageMoney.setMessage(callback.success, "Успешно");
        } else {
            manageMoney.setMessage(callback.success, callback.error);
        }
    });
};

let favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((callback) => {
    if (callback.success == true) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(callback.data);
        manageMoney.updateUsersList(callback.data);
    }
});
favoritesWidget.addUserCallback = function addUuser({
    id,
    name
}) {
    ApiConnector.addUserToFavorites({
        id,
        name
    }, (callback) => {
        if (callback.success == true) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(callback.data);
            manageMoney.setMessage(callback.success, "Успешно");
        } else {
            manageMoney.setMessage(callback.success, callback.error);
        }
    });
};
favoritesWidget.removeUserCallback = function remUser(id) {
    ApiConnector.removeUserFromFavorites(id, (callback) => {
        if (callback.success == true) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(callback.data);
            manageMoney.setMessage(callback.success, "Успешно");
        } else {
            manageMoney.setMessage(callback.success, callback.error);
        }
    });
};