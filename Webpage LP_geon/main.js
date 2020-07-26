
//confirmF(domString), prompt(donString)
var btn = document.getElementById("btn");
btn.addEventListener('click', function(){
    if(prompt('ok?') === 'egoing'){
        alert('ok');
    } else {
        alert('cancel');
    }
})