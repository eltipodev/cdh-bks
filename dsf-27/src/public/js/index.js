import { btnOrderPurchase } from "./button-order-purchase.js";
import { btnResetPassword } from "./button-resetPassword.js";
import { buttonAddProduct } from "./button-add-product.js";
import { buttonDeleteProduct } from "./button-delete-product.js";
// import { fetchPruebas } from "./fetch.pruebas.js";
import { getAllProducts } from "./getAll-products.js";
import { renderButtonPagination } from "./components/button-pagination.js";
import { selectCategoryFilter } from "./components/select-category-filter.js";
import { selectLimitFilter } from "./components/select-limit-filter.js";
import { selectOption } from "./components/select-option.js";
import { selectPriceFilter } from "./components/select-price-filter.js";
import { selectStockFilter } from "./components/select-stock-filter.js";

const container = document.querySelector(".section-products");
// const selectCartsOptions = document.querySelector(".select-carts-ctn");
const pagetitle = document.querySelector(".page-title");
const selectCategorysOptions = document.querySelector(".category");
const selectPricesOptions = document.querySelector(".price");
const selectLimitOptions = document.querySelector(".limit");
const selectStockOptions = document.querySelector(".stock");

// eslint-disable-next-line no-unused-vars
let cid;
let limit = "10";
let catg = "Todos";
let page = "1";
let sort = "default";
let stock;

document.addEventListener("click", async function (event) {
	handlePaginationClick(event);
	handleContainerClick(event);
	getbtnOrderPurchase(event);
	getbtnResetPassword(event);
	// getbtnChangePassword(event);
});

if (container && (pagetitle.textContent === "Productos")) {
	selectOption();
	setupCategoryOptions();
	setupStockOptions();
	setupPriceOptions();
	setupLimitOptions();
	// setupContainerClick();
}

function getbtnOrderPurchase(event) {
	if (event.target.classList.contains("order-purchase")) {
		const cid = event.target.attributes.cartId.value;
		btnOrderPurchase(cid);
	}
}

function getbtnResetPassword(event) {
	if (event.target.classList.contains("form-user-button--reset-pass")) {
		btnResetPassword();
	}
}
// function getbtnChangePassword(event) {
// 	if (event.target.classList.contains("change-password")) {
// 		btnResetPassword();
// 	}
// }

function handlePaginationClick(event) {
	if (event.target.classList.contains("button-pag-next")) {
		handleNextPageClick();
	} else if (event.target.classList.contains("button-pag-prev")) {
		handlePrevPageClick();
	} else if (event.target.classList.contains("paginate-item")) {
		page = event.target.getAttribute("numberPage").toString();
		handlePageNumberClick();
	}
}

function handleContainerClick(event) {
	const add = event.target.classList.contains("add");
	const remove = event.target.classList.contains("delete");

	if (event.target.attributes.cartId) {
		const cid = event.target.attributes.cartId.value;

		if (add) {
			const pid = event.target.getAttribute("prodId");
			buttonAddProduct(cid, pid);
		}
	} else if (remove) {
		const pid = event.target.getAttribute("prodId");
		buttonDeleteProduct(pid, limit, page, sort, catg);
	}
}

async function handleNextPageClick() {
	const message = await getAllProducts(limit, page, sort, stock, catg);
	page = message.payload.nextPage.toString();
	renderButtonPagination(limit, page, sort, stock, catg);
}

async function handlePageNumberClick() {
	renderButtonPagination(limit, page, sort, stock, catg);
}

async function handlePrevPageClick() {
	const message = await getAllProducts(limit, page, sort, stock, catg);
	page = message.payload.prevPage.toString();
	renderButtonPagination(limit, page, sort, stock, catg);
}

function setupCategoryOptions() {
	selectCategorysOptions.addEventListener("change", function () {
		catg = selectCategorysOptions.value;
		page = "1";
		selectCategoryFilter(limit, page, sort, stock, catg);
	});
}

function setupPriceOptions() {
	selectPricesOptions.addEventListener("change", function () {
		sort = selectPricesOptions.value;
		selectPriceFilter(limit, page, sort, stock, catg);
	});
}

function setupLimitOptions() {
	selectLimitOptions.addEventListener("change", function () {
		limit = selectLimitOptions.value;
		selectLimitFilter(limit, page, sort, stock, catg);
	});
}

function setupStockOptions() {
	selectStockOptions.addEventListener("change", function () {
		stock = selectStockOptions.value;
		selectStockFilter(limit, page, sort, stock, catg);
	});
}

// await fetchPruebas();