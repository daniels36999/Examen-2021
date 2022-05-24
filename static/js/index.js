//https://www.eclipse.org/paho/clients/js/
//document.getElementById("sensor1").innerHTML="LED1 ENCENDIDO";
var1=" ";
//var2=" ";
//FUNCION DEL BOTON ENCENDER - 1
function LED1_On(){
	message = new Paho.MQTT.Message("SENSOR1");
	message.destinationName = "dyautibug.fie@unach.edu.ec/test";
	client.send(message); 
	console.log("MUESTRA SENSOR 1");
	//var1="H1";
}
//FUNCION DEL BOTON APAGAR - 1
function LED2_On(){	
	message = new Paho.MQTT.Message("SENSOR2");
	message.destinationName ="dyautibug.fie@unach.edu.ec/test";
	client.send(message);
	console.log("MUESTRA SENSOR 2");
	//var2="H2";
}

//FUNCION DEL BOTON APAGAR - 1
function Exportar1(){	
	message = new Paho.MQTT.Message("HISTORIAL");
	message.destinationName ="dyautibug.fie@unach.edu.ec/test";
	client.send(message);
	console.log("MUESTRA HISTORIAL");
	var1="H1";
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
	
    client.subscribe("dyautibug.fie@unach.edu.ec/test1");
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
	  
	  if(sms=="Alta"||sms=="Baja"){
	  	document.getElementById("sensor1").innerHTML=sms;
	  }
	  if(sms=="Vacio"||sms=="Lleno"){
	  	document.getElementById("sensor2").innerHTML=sms;	  
	  }
	  
	  if(Npalabras==2&&var1=="H1"){
		document.getElementById("historial1").innerHTML=VectorDatos[0];
	  	document.getElementById("historial2").innerHTML=VectorDatos[1];
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


//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
  
