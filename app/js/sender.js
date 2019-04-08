$(function() {

  if (localStorage.un) {
      $('input[name=name]').val(localStorage.un);
  }
  if (localStorage.up) {
      $('input[name=phone]').val(localStorage.up);
  }
  if (localStorage.ue) {
      $('input[name=email]').val(localStorage.ue);
  }

  $('[type=tel]').intlTelInput({
    allowExtensions: false,
    autoFormat: true,
    autoHideDialCode: false,
    autoPlaceholder: false,
    defaultCountry: "auto",
    geoIpLookup: function(callback) {
      $.get('https://ipinfo.io', function() {}, "jsonp").always(function(resp) {
        var countryCode = (resp && resp.country) ? resp.country : "";
        callback(countryCode);
      });
    },
    nationalMode: false,
    numberType: 'MOBILE',
    preferredCountries: ['ua', 'ru', 'by', 'us'],
    utilsScript: 'js/utils.js'
  });

  var input = $('input, textarea');
  var select = $('select');
  var form = $('form');
  var patternHidden = /(\D)+[^0-9]{2,}/i;
  var patternText = /(\D)+[^0-9]{2,}/i;
  var patternEmail = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;
  var patternTel = /([+()0-9 ]){9,18}/i;
  var errorFieldsMessage = {
    text : ' Имя',
    tel : ' Телефон',
    email : ' Электронная почта',
  };

  function validationsField(field) {

    var fieldValue = field[0].value;
    var fieldType = field[0].type;

    var chk = field.closest('form').find('[type=checkbox]');

    if (fieldType == 'email') {
      var pattern = patternEmail;  
    } else if (fieldType == 'text' || fieldType == 'textarea') {
      var pattern = patternText;
    } else if (fieldType == 'tel') {
      var pattern = patternTel;
    } else if (fieldType == 'hidden') {
      return true; //var pattern = patternHidden;
    } else if (fieldType == 'checkbox') {
      return true;
    }
    return pattern.test(fieldValue);
  }

function validationsForm(form) {

  var fields = form.find('input:not([type=radio])');
  var errorAlert = form.find('.alert');
  var errorTags = form.find('.error-message');
  var numberIsValid = 0;
  var errorMessage = [];

  fields.each(function() {
    var field = $(this);
    var errorFieldType = field[0].type;
    if (validationsField(field)) {
      field.removeClass('is-invalid').addClass('is-valid');
      numberIsValid++;
    } else {
      if (errorFieldType == 'text') {
        errorMessage.push(errorFieldsMessage.text);
      } else if (errorFieldType == 'tel'){
        errorMessage.push(errorFieldsMessage.tel);
      } else if (errorFieldType == 'email') {
        errorMessage.push(errorFieldsMessage.email);
      }
      field.addClass('is-invalid');
    }
    
  });

  if (errorMessage.length > 0) {
    errorTags.html('<div class="alert alert-danger alert-dismissible" role="alert"><span class="alert-heading">' +'Ошибка заполнения</span><br><small><b>' + errorMessage + '</b></small><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');    
  } else {
    null;
  } 
  return fields.length == numberIsValid;
  
}
function keyupEventOff(e) {
  if (e.target.value === '') {
    $(this).removeClass('active');
  }
}

function keyupEvent(e) {
  var field = $(this);

  field.addClass('active');
  
  var errorTags = field.closest('form').find('.error-message');
  errorTags.html('');

  field.hasClass('is-invalid') ? field.removeClass('is-invalid') : false;
  validationsField(field) ? field.addClass('is-valid') : field.removeClass('is-valid');

}

function submitForm() {

  var me = $(this);
  var dataFields = me.find('input');
  var btnSubmit = me.find('[type=submit]');
  var lh = me.find('[name=lh]').val();
  if (validationsForm(me)) {
    me.addClass('send');
    btnSubmit.attr('disabled', true);

    var fieldsData = me.serialize();

    $.ajax({
      type: 'POST',
      url: 'https://shurina.ru/tr2019/lp/handler/handler.php',
      //dataType: 'json',
      data: fieldsData,
      statusCode: {
        200: function() {
          me.removeClass('send');
          me[0].reset();
          dataFields.removeClass('active').removeClass('is-valid');
          window.location.href = lh; localStorage.cast = 1;
        }
      }
    });
  }
}

input.keyup(keyupEvent).focusout(keyupEventOff).change(keyupEvent);
form.submit(submitForm);  
  
});