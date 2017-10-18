$(document).ready(()=>{

    var $msgCont = $('.messeges'); 
    var $sendBtn = $('#send');
    var $senderMsg = $('#sender-message');
    var $senderName = $('#sender-name');
    var msgCount = 0;
    var config = {
        apiKey: "AIzaSyBRpkRVgdZw84WVwPiMITU62mO1EsoRlHg",
        authDomain: "chat-b0d5a.firebaseapp.com",
        databaseURL: "https://chat-b0d5a.firebaseio.com",
        projectId: "chat-b0d5a",
        storageBucket: "chat-b0d5a.appspot.com",
        messagingSenderId: "384691217423"
    };
    firebase.initializeApp(config);
    
    var database = firebase.database();
    
    var starCountRef = firebase.database().ref('messages');
    starCountRef.on('value', function(messages) {
        
        populateMessages(messages.val())
    });
    $sendBtn.on('click', ()=>{
        if($senderName.val()===""){
            alert('Enter your name')
            $senderName.focus()
        }else  if($senderMsg.val()===""){
            alert('Enter your message')
            $senderMsg.focus()
        }else{
            writeUserData($senderName.val(), $senderMsg.val());
        }
        
    })
    function writeUserData(name, message) {
      
        firebase.database().ref('messages/' + msgCount).set({
          name: name,
          date: getDate(),
          message : message
        });
        $senderMsg.val("");
 
      }
    
    function populateMessages(messages){
        console.log(messages.length)
        msgCount = messages.length
        // msgCount = messages.lenght;
        $msgCont.empty();
        $.each(messages, (index, chat)=>{
            chat['id'] = index;
            $msgCont.append(templateChat(chat))
        })
    }
    
    function getDate() {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        return dateTime;
    }


    function templateChat(chat){
        return '<div class="chat" id="'+chat.id+'">'+
        '<div class="sender"> '+ chat.name + ' </div>'+
        '<div class="message-body">'+ chat.message + '</div>' +
                '<div class="message-date text-muted">' + chat.date + '</div>' +
        ' </div>'
    }

})


