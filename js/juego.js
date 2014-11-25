var canvas = null;//el canvas
var context = null;// contexto donde se dibujas todo.

function iniciar(){
	canvas = document.getElementById("canvas");
	//saber si soporta canvas
	if (canvas.getContext){
		context = canvas.getContext('2d');
	} else {
		alert("tu navegador no soporta canvas");
		return;
	}
	
	if (canvas != null){
		
		var contador = 0;
		var contador2 = 0;
		var vida = 100;
		var x = 150;
		var y = 150;
		var tamano = 60;

		//para saber que tecla ha sido presionada
		var arriba = false;
		var abajo = false;
		var izquierda = false;
		var derecha = false;
		
		var billete_x = 20;
		var billete_y = 20;
		var billete_ancho = 65;
		var billete_alto = 25;
		var billete_color = "#008000";
		var reemplazar_billete = true;
		
		var billetes = [5, -5, 10, -20, 20, 100];
		var billete_valor = 1;
		
		var puntos = 0;
		
		function colocar_billete(){
			if (reemplazar_billete){
				reemplazar_billete = false;
				billete_x = Math.floor(Math.random()* (canvas.width - billete_ancho));
				billete_y = Math.floor(Math.random()* (canvas.height - billete_alto));
				
				billete_valor = billetes[Math.floor(Math.random() * 6)];
			}
			

			var dolar = new Image();
			dolar.src = 'imagenes/dollar.jpg';
			context.drawImage(dolar,billete_x,billete_y,billete_ancho,billete_alto);
			context.font = "bold 18px Arial";
			context.fillStyle="#FF0000";
			context.fillText("$" + billete_valor , billete_x + (billete_ancho/2), billete_y + (billete_alto/2));
			
		}
		
		function ciclo(){

			contador++;
			contador2++;
			if(contador2 >=100){
				vida-=2;
				contador2 = 0;
				document.getElementById('vida').innerHTML = vida;
			}
			
			//color canvas
			context.fillStyle = "#3DD993";
			//cuadro que cubre al canvas
			context.fillRect(0, 0, canvas.width, canvas.height);
			colocar_billete();
			
			
			//Imagen Ratero
			var ratero = new Image();
			ratero.src = 'imagenes/thief.png';
			context.drawImage(ratero,x,y,tamano,tamano);
			
			//fuente
			context.font = "bold 20px Arial";
			
			//color texto
			context.fillStyle="#000000";
			
			//texto de los puntos
			context.fillText("Puntos: " + puntos , 10, 20);
			

			if(vida <= 0)
			{
				var gradient = context.createLinearGradient(0, 0, canvas.width, 0);
				context.font = ' 80px Black Ops One';
				gradient.addColorStop("0", "red");
				gradient.addColorStop("1", "black");
				context.fillStyle = gradient;
				context.fillText("GAME OVER", 50, 280);

				clearInterval(timer);
				

			}
			
			mover();
			if (tomar_billete()){
				puntos+=billete_valor;
				reemplazar_billete = true;
			}
			if(contador==50)
			{
				reemplazar_billete = true;
			}
			if (contador>50) {contador = 0;};
		}
		
		function tomar_billete(){
			var ratero_izquierda = x;
			var ratero_derecha = x + tamano;
			var ratero_fondo = y  + tamano;
			var ratero_tope = y;
			
			var billete_izquierda = billete_x;
			var billete_derecha = billete_x + billete_ancho;
			var billete_fondo = billete_y + billete_alto;
			var billete_tope = billete_y;
			
			if (ratero_izquierda >= billete_derecha){

				return false;
			}
			if (ratero_derecha <= billete_izquierda){
				return false;
			}
			if (ratero_fondo <= billete_tope){
				return false;
			}
			if (ratero_tope >= billete_fondo){
				return false;
			}
			
			return true;
		}
		
		function mover(){
			//si vamos a la izquierda y podemos restar 15 sin que de negativo
			if (izquierda && x >= 15){
				x-=15;
			}
			//si vamos a la derecha y podemos sumarle 15 sin pasarno del ancho de la pagina
			if (derecha && x+tamano <= (canvas.width - 15) ){
				x+=15;
			}
			if (arriba && y>= 15){
				y-=15;
			}
			if (abajo && y+tamano <= (canvas.height - 15) ){
				y+=15;
			}
			
			//ver si el ratero se ha topado con una moneda
			tomar_billete();
		}
		
		function keydown(e){
			var key = e.keyCode;
			
			switch(e.keyCode){
				//izquierda
				case 37:
					izquierda = true;
					break;
				//arriba
				case 38:
					arriba = true;
					break;
				//derecha
				case 39:
					derecha = true;
					break;
				//abajo
				case 40:
					abajo = true;
					break;
			}
		}
		
		function keyup(e){
			var key = e.keyCode;
			
			switch(e.keyCode){
				//izquierda
				case 37:
					izquierda = false;
					break;
				//arriba
				case 38:
					arriba = false;
					break;
				//derecha
				case 39:
					derecha = false;
					break;
				//abajo
				case 40:
					abajo = false;
					break;
			}
		}
		
		//este navegador soporta addEventListener
		//entonces vamos a usarlo
		if (window.addEventListener){
			//cuando presionen la tecla quiero que ejecute mi función mover
			//false tiene que ver con capturas por el momento no se moleste, y si lo saben pues tampoco se molesten
			window.addEventListener('keydown', keydown, true);
			window.addEventListener('keyup', keyup, true);
		//si no,  entonces soportas attachEvent
		}else if (window.attachEvent){
			window.attachEvent('keydown', keydown);
			window.addEventListener('keyup', keyup, true);
		}
		
		var timer = setInterval(ciclo, 10);
	}
}