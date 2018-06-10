## Todo list

* ~~薛丁格貓概念實驗換成薛丁格水熊來了~~
* ~~NO BUG NO QUANTUMXEI~~
* QX451 計算
* map.txt
* UET-like contract deployment
* UET-like contract tool page


## Quantum Shield

SVG.js | Manipulating http://svgjs.com/manipulating/

## Elliptic curve

Elliptic curve - Wikipedia https://en.wikipedia.org/wiki/Elliptic_curve

y^3 = x^2 + ax + b 

y^3 = x^2 + 7 ,a=0 ,b=7, 256k1 

Secp256k1 - Bitcoin Wiki https://en.bitcoin.it/wiki/Secp256k1

https://cdn.rawgit.com/andreacorbellini/ecc/920b29a/interactive/reals-mul.html


### QX451

y^3 = x^2 + 1984x + 451 in F97 ,a=1984 ,b=451, quantumxie451, qx451

P (x,y) =  79,36
n = 1, Q = nP = 79,36
n = 2, Q = nP = 4,20
n = 3, Q = nP = 49,48
n = 100, Q = nP = 15,11
n = 123, Q = nP = 2,16

## Status 451

https://status-451-sy74t8gbzz0j.runkit.sh/

```
exports.endpoint = function(request, response) {
   var body = '2+2=5 https://tools.ietf.org/html/rfc7725';
   response.writeHead(451, {
     'Content-Length': body.length,
     'Content-Type': 'text/plain' });
   response.end(body);
}
```