

function search(name, category, growthrate, pricemin, pricemax, heightmin, heightmax) {
  console.log(arguments);
  var path= `/search?pricemin=${pricemin}&pricemax=${pricemax}&heightmin=${heightmin}&heightmax=${heightmax}`;

  if(name != ""){
    path += `&name=${name}`;
  }

  if(category != ""){
    path += `&category=${category}`;
  }

  if(growthrate != ""){
    path += `&growthrate=${growthrate}`;
  }

  window.location.href=path;

}


function clearsearch() {
  window.location.href='/listings';
}

function logon(user, pass) {
  window.location.href=`/logon?user=${user}&pass=${pass}`;
}

function signup(username, password, email) {
  window.location.href=`/signup?username=${username}&password=${password}&email${email}`;
}
