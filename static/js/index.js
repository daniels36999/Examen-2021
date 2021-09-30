//https://www.eclipse.org/paho/clients/js/
//document.getElementById("sensor1").innerHTML="LED1 ENCENDIDO";
//var1=" ";
//var2=" ";
//FUNCION DEL BOTON ENCENDER - 1
function LED1_On() {
	message = new Paho.MQTT.Message("SENSOR1");
	message.destinationName = "dyautibug.fie@unach.edu.ec/test1";
	client.send(message); 
	console.log("MUESTRA SENSOR 1");
	//var1="H1";
}
//FUNCION DEL BOTON APAGAR - 1
function LED2_On(){	
	message = new Paho.MQTT.Message("SENSOR2");
	message.destinationName ="dyautibug.fie@unach.edu.ec/test1";
	client.send(message);
	console.log("MUESTRA SENSOR 2");
	//var2="H2";
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
	document.getElementById("sensor1").innerHTML="Sensor - 1: "+VectorDatos[0];
	document.getElementById("sensor2").innerHTML="Sensor - 2: "+VectorDatos[1];
	  
	  if(Npalabras==3&&var1=="H1"){
	  	document.getElementById("historial1").innerHTML=VectorDatos[2];
	  }
	  if(Npalabras==4&&var2=="H2"){
	  	document.getElementById("historial2").innerHTML=VectorDatos[3];
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
function Exportar1()
{      
    var textToWrite = document.getElementById("historial1").innerHTML;
    var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
    var NombreGuardar = "Historial-S1.txt";
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

function Exportar2()
{      
    var textToWrite = document.getElementById("historial2").innerHTML;
    var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
    var NombreGuardar = "Historial-S2.txt";
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
  
