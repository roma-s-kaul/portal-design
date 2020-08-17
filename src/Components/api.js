const getdata = async(plan) => {
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    var targetUrl = `http://ckg03.isi.edu:8050/getneighborfrombusinessplan?businessplan=${plan}`;
    //const xyz = await fetch(proxyUrl + targetUrl);
    //const data = await xyz.json();
    return fetch(proxyUrl + targetUrl)
   .then(function(response) {
     return response.json()
   }).then(function(json) {
     console.log('parsed json', json);
     return json;
   }).catch(function(ex) {
     console.log('parsing failed', ex)
   });

 };

module.exports = getdata;