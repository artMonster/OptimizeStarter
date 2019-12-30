<?php
  $val = 'USD';
?>
<html>
<head>
  <meta charset="utf-8">
  <title>ТРАНСФОРМАЦИЯ 2019: деньги, отношения, здоровье, статус</title>
  <meta name="description" content="Уберите блокирующие убеждения и станьте успешными в ключевых сферах жизни">

  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

  <!-- Template Basic Images Start -->
  <meta property="og:image" content="../img/og.png">
  <meta property="og:image:width" content="600">
  <meta property="og:image:height" content="315">
  <link rel="icon" href="../img/favicon/favicon.ico">
  <link rel="apple-touch-icon" sizes="180x180" href="../img/favicon/apple-touch-icon-180x180.png">
  <!-- Template Basic Images End -->
  
  <!-- Custom Browsers Color Start -->
  <meta name="theme-color" content="#000">
  <script src="//api.fondy.eu/static_common/v1/checkout/ipsp.js"></script>
</head>
<body style="margin:0;padding:0;">
<div id="checkout" style="background-color: #fff;"></div>

<script>
var LSN = '';
var LSE = '';
var LSP = '';
var LPR = '';
if (localStorage.un && localStorage.ue && localStorage.up && localStorage.pr)  { 
    LSN = localStorage.un;
    LSE = localStorage.ue;
    LSP = localStorage.up;
    LPR = localStorage.pr;
}

var respLink = 'https://shurina.ru/tr2019/kyrs-full.html';

if (LPR == '200') {
  respLink = 'https://shurina.ru/tr2019/success.html';
}

if (LPR == '250' || LPR == '490') {
  respLink = 'https://shurina.ru/tr2019/lp/';
}

var button = $ipsp.get("button");
button.setHost("api.fondy.eu");
button.setProtocol("https");
button.setMerchantId(1414073); //1414073
button.setAmount(LPR,"<?php echo $val; ?>",true);
button.setResponseUrl(respLink);
button.addParam("lang","ru");
button.addParam("server_callback_url","https://shurina.ru/callback/");
button.addField({
   "label": "Имя",
   "required": true,
   "name": "Name",
   "value": LSN
});
button.addField({
   "label": "Email при регистрации",
   "required": true,
   "readonly": false,
   "name": "EmailReg",
   "value": LSE
});
button.addField({
   "label": "Телефон",
   "required": true,
   "readonly": false,
   "name": "Tel",
   "value": LSP
});
button.addField({
   "label": "l_id",
   "required": false,
   "readonly": true,
   "hidden": true,
   "name": "l_id",
   "value": localStorage.l_id
});
var url = button.getUrl();
$ipsp("checkout").config({
    "wrapper": "#checkout",
        "styles": {
            "body": {
                "overflow": "hidden",
                "background": "transparent"
            },
            ".pages-checkout": {
                "background": "transparent"
            }
        }
}).scope(function () {
    this.width('100%');
    this.height(480);
    this.action('resize', function (data) {
        this.setCheckoutHeight(data.height);
    })
    this.addCallback(__DEFAULTCALLBACK__);
    this.loadUrl(url);
});
</script>
</body>
</html>