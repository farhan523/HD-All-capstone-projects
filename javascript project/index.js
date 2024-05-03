// Function to format ingredients list
function formatIngredientsList(mainIngredients) {
    return mainIngredients.toLowerCase().split(" ").join("_");
}

// Function to select a random favorite meal
function selectRandomFavoriteMeal(mealList) {
    return mealList[Math.floor(Math.random() * mealList.length)];
}

// Function to get the main ingredient from user input
function getMainIngredients() {
    let mainIngredients = prompt("Please enter main ingredient");
    if (mainIngredients == null) return getMainIngredients();
    return mainIngredients;
}

// Function to fetch chef's favorite meal based on main ingredient
async function getChefFavoriteMeal(mainIngredient) {
    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${mainIngredient}`);
        const data = await res.json();
        if (data.meals == null) {
            alert("No item found for given ingredient. Please enter main ingredient again.");
            return placeOrder();
        }
        return data.meals;
    } catch (e) {
        alert("Error occurred. Please try again.");
        return null;
    }
}

// Function to store order in session storage
function storeOrderInSessionStorage(meal) {
    let orders = JSON.parse(sessionStorage.getItem("orders")) || [];
    orders.push({
        orderNumber: orders.length + 1,
        description: meal.strMeal,
        status: 0
    });
    sessionStorage.setItem("orders", JSON.stringify(orders));
}

// Function to get orders from session storage
function getOrdersFromStorage() {
    return JSON.parse(sessionStorage.getItem("orders")) || [];
}

// Function to update complete orders on the screen
function updateCompleteOrder() {
    let completeOrderDiv = document.querySelector(".completeOrders");
    completeOrderDiv.innerHTML = "<h2>Completed Orders</h2>";

    getOrdersFromStorage().forEach((order) => {
        if (order.status == 0) return;
        const orderDetailsDiv = document.createElement("div");
        orderDetailsDiv.classList.add("orderDetails");
        orderDetailsDiv.innerHTML = `<p><b>Order Number</b>: ${order.orderNumber}</p><p><b>Description</b>: ${order.description}</p>`;
        completeOrderDiv.appendChild(orderDetailsDiv);
    });
}

// Function to update incomplete orders on the screen
function updateIncompleteOrder() {
    let incompleteOrderDiv = document.querySelector(".incompleteOrders");
    incompleteOrderDiv.innerHTML = "<h2>Incomplete Orders</h2>";

    getOrdersFromStorage().forEach((order) => {
        if (order.status == 1) return;
        const orderDetailsDiv = document.createElement("div");
        orderDetailsDiv.classList.add("orderDetails");
        orderDetailsDiv.innerHTML = `<p><b>Order Number</b>: ${order.orderNumber}</p><p><b>Description</b>: ${order.description}</p>`;
        incompleteOrderDiv.appendChild(orderDetailsDiv);
    });

    const completeOrderBtn = document.createElement("button");
    completeOrderBtn.innerText = "Complete Order";
    completeOrderBtn.id = "complete-order-btn";
    completeOrderBtn.addEventListener("click", completeOrder);
    incompleteOrderDiv.appendChild(completeOrderBtn);
}

// Function to update both complete and incomplete orders on the screen
function updateScreen() {
    updateIncompleteOrder();
    updateCompleteOrder();
}

// Function to place an order
async function placeOrder() {
    let mainIngredient = getMainIngredients();
    if (!mainIngredient) return;
    let mealList = await getChefFavoriteMeal(formatIngredientsList(mainIngredient));
    if (!mealList) return;
    storeOrderInSessionStorage(selectRandomFavoriteMeal(mealList));
    updateScreen();
}

// Function to initialize session storage
function initializeSessionStorage() {
    sessionStorage.setItem("orders", "[]");
}

// Function to complete an order
function completeOrder() {
    const orderId = prompt("Enter order id to be completed");
    let orders = getOrdersFromStorage();
    let orderExist = orders.some(order => {
        if (order.status == 1 || order.orderNumber != orderId) return false;
        order.status = 1;
        return true;
    });
    if (!orderExist) alert("No incomplete order with this id exists");
    sessionStorage.setItem("orders", JSON.stringify(orders));
    updateIncompleteOrder();
    updateCompleteOrder();
}

// Function to attach event listener for order button
function attachOrderListener() {
    const orderBtn = document.getElementById("order-btn");
    orderBtn.addEventListener("click", placeOrder);
}

// Function to initialize the application
function main() {
    initializeSessionStorage();
    attachOrderListener();
    updateScreen();
}

// Call the main function to start the application
main();
