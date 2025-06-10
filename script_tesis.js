function generarEnunciado() {
    const proposito = document.getElementById('proposito').value;
    const variables = document.getElementById('variables').value;
    const unidades = document.getElementById('unidades').value;
    const delimitacion = document.getElementById('delimitacion').value;
    
    document.getElementById('parte1').textContent = proposito + ", ";
    document.getElementById('parte2').textContent = " " + variables + " ";
    document.getElementById('parte3').textContent = " " + unidades + " ";
    document.getElementById('parte4').textContent = " " + delimitacion + ".";
    
    document.getElementById('enunciado').style.display = 'block';
}

function copiarEnunciado() {
    const parte1 = document.getElementById('parte1').textContent;
    const conector1 = document.getElementById('conector1').value;
    const parte2 = document.getElementById('parte2').textContent;
    const conector2 = document.getElementById('conector2').value;
    const parte3 = document.getElementById('parte3').textContent;
    const conector3 = document.getElementById('conector3').value;
    const parte4 = document.getElementById('parte4').textContent;
    
    const textoCompleto = parte1 + conector1 + parte2 + conector2 + parte3 + conector3 + parte4;
    
    navigator.clipboard.writeText(textoCompleto).then(() => {
        alert("Enunciado copiado:\n\n" + textoCompleto);
    });
}