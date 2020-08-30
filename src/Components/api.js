export const getdata = (plan) => {
    //var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    var targetUrl = `http://ckg03.isi.edu:8050/getneighborfrombusinessplan?businessplan=${plan}`;
    //const xyz = await fetch(proxyUrl + targetUrl);
    //const data = await xyz.json();
    return fetch(targetUrl)
   .then(function(response) {
    //return response.json()
    if (response.ok) {
      return response.json();
    } else {
      alert('Unable to fetch response')
      throw new Error('Something went wrong');
    }
   }).then(function(json) {
     console.log('parsed json', json);
     return json;
   }).catch(function(ex) {
     console.log('parsing failed', ex)
   });

 };

 export const getAdditionalInfo = (url) => {
  var targetUrl = `http://ckg03.isi.edu:8050/info?url=${url}`;
    return fetch(targetUrl)
   .then(function(response) {
    //return response.json()
    if (response.ok) {
      return response.json();
    } else {
      alert('Unable to fetch response')
      throw new Error('Something went wrong');
    }
   }).then(function(json) {
     console.log('parsed json', json);
     return json;
   }).catch(function(ex) {
     console.log('parsing failed', ex)
   });
 }

export default getdata;