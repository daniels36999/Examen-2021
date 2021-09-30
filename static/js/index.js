//https://www.eclipse.org/paho/clients/js/
//document.getElementById("sensor1").innerHTML="LED1 ENCENDIDO";

//FUNCION DEL BOTON ENCENDER - 1
function LED1_On() {
	message = new Paho.MQTT.Message("LED1_ON");
	message.destinationName = "dyautibug.fie@unach.edu.ec/test1";
	client.send(message); 
	console.log("LED 1 ENCENDIDO");
}
//FUNCION DEL BOTON APAGAR - 1
function LED1_Off(){	
	message = new Paho.MQTT.Message("LED1_OFF");
	message.destinationName ="dyautibug.fie@unach.edu.ec/test1";
	client.send(message);
	console.log("LED 1 APAGADO");
}

//FUNCION DEL BOTON ENCENDER - 2
function LED2_On() {
	message = new Paho.MQTT.Message("LED2_ON");
	message.destinationName = "dyautibug.fie@unach.edu.ec/test1";
	client.send(message); 
	console.log("LED 2 ENCENDIDO");
}
//FUNCION DEL BOTON APAGAR - 2
function LED2_Off(){	
	message = new Paho.MQTT.Message("LED2_OFF");
	message.destinationName ="dyautibug.fie@unach.edu.ec/test1";
	client.send(message);
	console.log("LED 2 APAGADO");
}

//FUNCION DEL BOTON ENCENDER - 3
function LED3_On() {
	message = new Paho.MQTT.Message("LED3_ON");
	message.destinationName = "dyautibug.fie@unach.edu.ec/test1";
	client.send(message); 
	console.log("LED 3 ENCENDIDO");
}
//FUNCION DEL BOTON APAGAR - 3
function LED3_Off(){	
	message = new Paho.MQTT.Message("LED3_OFF");
	message.destinationName ="dyautibug.fie@unach.edu.ec/test1";
	client.send(message);
	console.log("LED 3 APAGADO");
}

var1=" ";
//FUNCION DEL BOTON MOSTRAR HISTORIAL
function Histo1(){
	message = new Paho.MQTT.Message("MOSTRAR_HISTORIAL");
	message.destinationName ="dyautibug.fie@unach.edu.ec/test1";
	client.send(message);
	console.log("Se Mostrara el Historial");
	var1="MM";
}

//FUNCION DEL BOTON OCULTAR HISTORIAL
function Histo2(){	
	message = new Paho.MQTT.Message("OCULTAR_HISTORIAL");
	message.destinationName ="dyautibug.fie@unach.edu.ec/test1";
	client.send(message);
	console.log("Se Ocultara el Historial");
	var1="OO";
}

// Create a client instance
  //client = new Paho.MQTT.Client("postman.cloudmqtt.com", 14970);
  
  client = new Paho.MQTT.Client("maqiatto.com", 8883, "web_" + parseInt(Math.random() * 100, 10));

  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  var options = {
   useSSL: false,
    userName: "dyautibug.fie@unach.edu.ec",
    password: "daniels",
    onSuccess:onConnect,
    onFailure:doFail
  }

  // connect the client
  client.connect(options);
   
  // called when the client connects
  function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("Conectado...");
	
    client.subscribe("dyautibug.fie@unach.edu.ec/test");
    message = new Paho.MQTT.Message("SE A CONECTADO A LA WEB EXITOSAMENTE");
    message.destinationName = "dyautibug.fie@unach.edu.ec/test1";
    client.send(message);
	
  }

  function doFail(e){
    console.log(e);
	
  }

  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  }

  // called when a message arrives
  function onMessageArrived(message) {
    //console.log("onMessageArrived:"+message.payloadString);
	  //document.getElementById("sensor").innerHTML=message.payloadString;
	sms=(message.payloadString);
	  
	VectorDatos=sms.split(";")  
	Npalabras =VectorDatos.length;
	document.getElementById("sensor1").innerHTML="Temperatura: "+VectorDatos[0];
	document.getElementById("sensor2").innerHTML="Distancia: "+VectorDatos[1];
	document.getElementById("sensor3").innerHTML="Tanque: "+VectorDatos[2];
	  
	  if(Npalabras>=4&&var1=="MM"){
	  	document.getElementById("historial").innerHTML=VectorDatos[3];
	  }
	  if(var1=="OO"){
	  	document.getElementById("historial").innerHTML="Dispositivos Embebidos Historial.";
	  }
	
	  
//	Dividir = sms.split(" ");
//	Npalabras =Dividir.length;

//	  if(sms=="Alta"){
//	  	document.getElementById("sensor1").innerHTML="Temperatura: "+sms;
//	  }
//	  if(sms=="Baja"){
//	  	document.getElementById("sensor1").innerHTML="Temperatura: "+sms;	  
//	  }
//	  if(Npalabras>=10){
//	  	document.getElementById("historial").innerHTML=sms;	  
//	  }
//	  if(var1=="OO"){
//	  	document.getElementById("historial").innerHTML="---------------------------";	  
//	  }
	  
	  
	  
  }

//EXPORTAR
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
function Exportar()
{      
    var textToWrite = document.getElementById("historial").innerHTML;
    var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
    var NombreGuardar = "Embebidos - Historial de Sensores.txt";
    var downloadLink = document.createElement("a");
	
    downloadLink.download = NombreGuardar;
    downloadLink.innerHTML = "My Hidden Link";

    window.URL = window.URL || window.webkitURL;
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
}
 
function destroyClickedElement(event)
{
    document.body.removeChild(event.target);
}
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
  
