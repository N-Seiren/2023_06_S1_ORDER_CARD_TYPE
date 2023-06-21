$(function () {
	// Header Hover
	defHeaderHover();

	// Dropdown Open
	defDropdown();
});

// HEADER
function defHeaderHover() {
	$('.depth1--btn').each((index, el) => {
		const _this = $(el);
		const _header = $('header');

		_header
			.on('mouseover', () => {
				_header.addClass('hover');
			})
			.on('mouseout', () => {
				_header.removeClass('hover');
			});
	});
}

function defDropdown() {
	$('.dropdown--select').each((index, el) => {
		const _btn = $(el);
		const _area = _btn.closest('.dropdown--area');
		const _box = _area.find('.dropdown--box');
		const _itm = _box.find('button');

		_btn.on('click', () => {
			if (_area.hasClass('open')) {
				closeDropdown(_area);
			} else {
				openDropdown(_area);
			}
		});

		_itm.each((idx, itm) => {
			$(itm).on('click', () => {
				setTextDropdown(itm);
			});
		});
	});
}
function closeDropdown(el) {
	$(el).removeClass('open');
}
function openDropdown(el) {
	$('.dropdown--area').removeClass('open');
	$(el).addClass('open');
}
function setTextDropdown(el, txt) {
	const _el = $(el);
	const _area = _el.closest('.dropdown--area');
	const _btn = _area.find('.dropdown--select');
	const _box = _area.find('.dropdown--box');
	const _itm = _box.find('button');

	const _txt = _el.html();

	_itm.removeClass('active');
	_el.addClass('active');
	_btn.find('div').html(_txt);
	closeDropdown(_area);
}
