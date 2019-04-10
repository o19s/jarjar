/*
topicID	workerID	docID	gold	label
20002	w1	clueweb09-en0000-66-24091	-1	0
20002	w1	clueweb09-en0001-31-15410	-1	0
20002	w1	clueweb09-en0000-05-22942	-1	0
20002	w1	clueweb09-en0000-05-22943	-1	0
*/

var data = require('fs').readFileSync('./trec-rf10-data.txt','utf8').split('\n').map(r=>r.split('\t'));

var ws = [];
var sw = [];
var mx = 108; //12 boxes, 9 players each box

for(var i=1;i<data.length;i++) {
	var r1 = data[i];
	var w1 = r1[1];
	ws[w1] = ws[w1]||0
	ws[w1]++;
}
for(w2 in ws) if (ws.hasOwnProperty(w2)) sw.push({"workerID":w2,"count":ws[w2]});

w = []
sw.sort((a,b)=>(b.count-a.count));
sw.slice(0,mx).forEach(a=>w[a.workerID]=a.count);

//console.log(w);

//const w = "w1,w2,w3,w4,w5,w6,w7,w8,w9".split(',')
data = data.filter(r=>w.hasOwnProperty(r[1]));
data = data.sort((a,b)=>((w[b[1]]-w[a[1]])||b[1]<a[1]));
console.log("topicID,workerID,docID,gold,label");
data.map(r=>r.join(',')).forEach(r=>console.log(r));