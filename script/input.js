document.getElementById('submit').addEventListener('click', function input(){
    const pasword = document.getElementById('pasword').value;

    if (pasword === "1234") {
        let style = document.getElementById('nav')
        style.style.display="block"
        let stylee = document.getElementById('FAQ')
        stylee.style.display="block"
        let styleee = document.getElementById('faq')
        styleee.style.display="block"
    }
})