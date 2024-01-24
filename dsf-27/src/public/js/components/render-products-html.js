/* eslint-disable quotes */

export const renderProductsHTML = (messages = "") => {
	const productsElement = document.querySelector(".section-products");
	const paginationElement = document.querySelector(".paginate-ctn");
	const isAdmin = messages.user === "ADMIN";

	const productsHtml = messages.payload.docs.map(element => `
	<div class="products-ctn ${isAdmin || element.stock === 0 ? 'stockNoneCtn' : ''}"><div class="products-main">${isAdmin ? `<img class="button-actions delete" prodId="${element._id}" src="/img/empty-wood-bucket-svgrepo-com.svg" alt="">` : ""}  ${isAdmin || element.stock === 0 ? `<span class="stockNoneBanner" prodId="${element._id}" cartid="${messages.cartId}" >Out of stock</span>` : `<img class="button-actions add move" src="/img/plus-sign-in-a-circle-svgrepo-com.svg" prodId="${element._id}" cartid="${messages.cartId}" alt="">`}
          <div>
            <img src="${element.thumbnails || "/img/imagen_v acio.png"}" alt="imagen de una ${element.title}" class="products-main-img">
            <div class="products-footer-credits"><span>Foto generada con IA</span></div>
            <div class="products-header">
              <div class="products-header-title">${element.title}<span class="products-stock">(${element.stock})</span></div>
            </div>
          </div>
        </div>
        <div class="products-footer">
          <div class="products-footer-price">${element.price}</div>
          <span class="products-footer-vermas">${element.stock !== 0 ? ' <a href="/api/vista/products/${element._id}">ver mas</a>' : ' <span>ver mas</span>'}</span>
          <span class="product-id-single carts-id-single-text">${element._id}</span>
        </div>
      </div>

    `);

	const paginateHtml = `
		<div class="button-pag-prev ${messages.payload.prevPage ? "button-pag--add" : "button-pag--remove"}"></div>
		<ul>${messages.pagination.map(p => `<li class=${messages.payload.page === p ? "button-pag-now" : "paginate-item"} numberPage=${p}>${p}</li>`).join("")}</ul><div class="button-pag-next ${messages.payload.nextPage ? "button-pag--add" : "button-pag--remove"}"></div>`;

	productsElement.innerHTML = productsHtml.join("");

	paginationElement.innerHTML = paginateHtml;
};
