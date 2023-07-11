$(function () {
	designInit();
});

$(window).on('load', function () {
	// Datepicker
	designRecall();
});
$(window).on('resize', function () {
	// Datepicker
	designRecall();
});
$(window).on('scroll', function () {
	// Datepicker
	designRecall();
});

function designInit() {
	// Header Hover
	defHeaderHover();
	// Dropdown Open
	defDropdown();
	// Table Check
	defTblCheck();
	// Datepicker
	defDatepicker();
}
function designRecall() {
	// Datepicker
	recallDatepicker();
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
			hideTimerLayer(_btn);

			if (_area.hasClass('open')) {
				closeDropdown(_area);
			} else {
				openDropdown(_area);
			}
		});

		_itm.each((idx, itm) => {
			$(itm).on('click', () => {
				hideTimerLayer(_btn);

				setTextDropdown(itm);
			});
		});
	});
}
function hideTimerLayer(_btn) {
	if (_btn.closest('.has--timer').length == 0) {
		$('.datepicker--layer').hide();
	}
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
 * Datepicker
 */
function defDatepicker() {
	const _today = new Date();
	let _year = _today.getFullYear(),
		_month = _today.getMonth() + 1,
		_date = _today.getDate();

	if (_month < 10) {
		_month = '0' + _month;
	}
	if (_date < 10) {
		_date = '0' + _date;
	}

	$('.input-text .box.date, .inline-calendar').each((idx, el) => {
		$(el).on('click', function () {
			$('.datepicker--layer').hide();
		});
		$(el).datepicker({
			startDate: String(_year + '.' + _month + '.' + _date),
			startView: 0, // 0 ~ 2 (day ~ year)
			maxViewMode: 2,
			todayHighlight: true,
			// autoclose: true,
			defaultViewDate: { year: _year, month: _month - 1, day: _date },
			language: 'ko',
		});
	});

	$('.date-layer').each((idx, el) => {
		const _this = $(el);
		const _input = _this.find('input');
		const _layer = _this.find('.datepicker--layer');
		const _picker = _this.find('.inline-calendar');
		const _tr = _this.closest('tr');

		_input.on('click', function () {
			if (_tr.length > 0) {
				_tr.css('z-index', 10);
			}

			const _val = _input.val() != '' ? new Date(_input.val()) : false;
			if (_val) {
				_picker.datepicker('setDate', _val);
			}

			if (_this.hasClass('focus')) {
				_layer.hide();
				_this.removeClass('focus');
				_this.css('z-index', '');
			} else {
				$('.date-layer').removeClass('focus');
				$('.datepicker--layer').hide();
				_layer.show();
				_this.addClass('focus');
				_this.css('z-index', 20);
			}
		});

		_picker.datepicker().on('changeDate', function (e) {
			const _dates = _picker.datepicker('getDate');
			let _month, _date, _str;

			if (_dates) {
				_month = _dates.getMonth() + 1;
				_date = _dates.getDate();

				if (_month < 10) {
					_month = '0' + _month;
				}
				if (_date < 10) {
					_date = '0' + _date;
				}

				_str = _dates.getFullYear() + '.' + _month + '.' + _date;
			} else {
				_str = '';
			}
			_input.val(_str);
			if (!_layer.hasClass('has--timer')) {
				_this.removeClass('focus');
				_layer.hide();
				_this.css('z-index', '');
			}

			if (_tr.length > 0) {
				_tr.css('z-index', '');
			}
		});
	});
}
function recallDatepicker() {
	$('.date-layer').each((idx, el) => {
		const _this = $(el);
		const _input = _this.find('input');
		const _pickerLayer = _this.find('.datepicker--layer');
		// Layer check
		const _chkLayer = _this.closest('.layer--area') ? true : false;
		const _scrollCont = _chkLayer
			? _this.closest('.layer--area').find('.layer--contents')
			: 0;

		let _offsetTop = _this.offset().top + _this.outerHeight(),
			_offsetLeft = _this.offset().left,
			_offsetRight = 0;

		// Layer width (fixed)
		const _pickerLayerW = 360;

		_offsetTop = _offsetTop - $(window).scrollTop();
		_offsetLeft = _offsetLeft - $(window).scrollLeft();
		_offsetRight = _offsetLeft - (_pickerLayerW - _this.outerWidth());

		if (_this.offset().left + _pickerLayerW >= $('.wrap').width()) {
			_pickerLayer.css({
				top: _offsetTop,
				left: _offsetRight,
			});
		} else {
			_pickerLayer.css({
				top: _offsetTop,
				left: _offsetLeft,
			});
		}

		if (_chkLayer) {
			// Contents Scroll Top
			_scrollCont.on('scroll', function () {
				_pickerLayer.css({
					top: _offsetTop - _scrollCont.scrollTop(),
				});
			});
		}
	});
}
function resetDatepicker(el) {
	const _this = $(el);
	const _box = _this.closest('.input-text');
	const _calendar = _box.find('.datepicker--layer .inline-calendar');

	_calendar.datepicker('clearDates');
}

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

/**
 * Toggle Box
 */
function toggleArea(el) {
	const _this = $(el);
	const _area = _this.closest('.toggle--area');

	if (_area.hasClass('active')) {
		_area.removeClass('active');
	} else {
		_area.addClass('active');
	}
}
