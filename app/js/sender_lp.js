$(function() {

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
  var errorTags = form.find('.error-message');
  var numberIsValid = 0;
  var errorMessage = [];

  fields.each(function() {
    var field = $(this);
    var errorFieldType = field[0].type;
    if (validationsField(field)) {
      field.removeClass('error').addClass('accept');
      numberIsValid++;
    } else {
      if (errorFieldType == 'text') {
        errorMessage.push(errorFieldsMessage.text);
      } else if (errorFieldType == 'tel'){
        errorMessage.push(errorFieldsMessage.tel);
      } else if (errorFieldType == 'email') {
        errorMessage.push(errorFieldsMessage.email);
      }
      field.addClass('error');
    }
    
  });

  errorMessage.length > 0 ? errorTags.html('Некорректное заполнение: <br><b>' + errorMessage + '</b>') : null;
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

  field.hasClass('error') ? field.removeClass('error') : false;
  validationsField(field) ? field.addClass('accept') : field.removeClass('accept');

}

function submitForm() {

  var me = $(this);
  var dataFields = me.find('input');
  var btnSubmit = form.find('[type=submit]');

  if (validationsForm(me)) {
    me.addClass('send');
    btnSubmit.attr('disabled', true);

    var fieldsData = me.serialize();

    $.ajax({
      type: 'POST',
      url: 'mail/mail.php',
      //dataType: 'json',
      data: fieldsData,
      statusCode: {
        200: function() {
          me.removeClass('send');
          me[0].reset();
          dataFields.removeClass('active').removeClass('accept');
        }
      }
    });
  }
}

input.keyup(keyupEvent).focusout(keyupEventOff).change(keyupEvent);
form.submit(submitForm);  
  
});