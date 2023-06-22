$(function () {
	designInit();
});

function designInit() {
	// Header Hover
	defHeaderHover();
	// Dropdown Open
	defDropdown();
	// Table Check
	defTblCheck();
}

/**
 * HEADER
 */
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

/**
 * Dropdown
 */
// Default
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
// close
function closeDropdown(el) {
	$(el).removeClass('open');
}
// open
function openDropdown(el) {
	$('.dropdown--area').removeClass('open');
	$(el).addClass('open');
}
// text set
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

/**
 * Table Check
 */
function defTblCheck() {
	$('.tbl-check > input').each((index, el) => {
		const _tr = $(el).closest('tr');

		if ($(el).is(':checked')) {
			_tr.addClass('is--checked');
		}
	});
	$('.tbl-check-all > input').each((index, el) => {
		const _table = $(el).closest('table');
		const _tr = _table.find('tbody tr');

		if ($(el).is(':checked')) {
			_tr.each((index, e) => {
				$(e).find('.tbl-check input').prop('checked', true);
			});
			_tr.addClass('is--checked');
		}
	});
}
// Table 체크 감지
$(document).on('change', '.tbl-check', (e) => {
	const _el = $(e.target);
	const _tr = _el.closest('tr');
	const _tbl = _el.closest('table');

	if (_el.is(':checked')) {
		_tr.addClass('is--checked');
	} else {
		_tr.removeClass('is--checked');
	}

	if (_tbl.find('.tbl-check-all').length > 0) {
		const _all = _tbl.find('.tbl-check input').length;
		const _chk = _tbl.find('.tbl-check input:checked').length;
		if (_all == _chk) {
			_tbl.find('.tbl-check-all input').prop('checked', true);
		} else {
			_tbl.find('.tbl-check-all input').prop('checked', false);
		}
	}
});
$(document).on('change', '.tbl-check-all', (e) => {
	const _el = $(e.target);
	const _table = _el.closest('table');
	const _tr = _table.find('tbody tr');

	if (_el.is(':checked')) {
		_tr.each((index, e) => {
			$(e).find('.tbl-check input').prop('checked', true);
			$(e).addClass('is--checked');
		});
	} else {
		_tr.each((index, e) => {
			$(e).find('.tbl-check input').prop('checked', false);
			$(e).removeClass('is--checked');
		});
	}
});

/**
 * Tab
 */
function openTabBtn(el) {
	const _wrap = $(el).closest('.tab--wrap');
	const _btn = _wrap.find('button');
	const _box = _wrap.children('.tab--contents');
	const _idx = _btn.index($(el));

	_btn.removeClass('active');
	_box.hide();
	_btn.eq(_idx).addClass('active');
	_box.eq(_idx).show();
}

/**
 * Layer
 */
function toggleLayer(el) {
	if ($('.layer--area' + el).is(':visible')) {
		$('html').css('overflow', '');
		$(el).css('display', '');
	} else {
		$('html').css('overflow', 'hidden');
		$(el).css('display', 'flex');
	}
}
