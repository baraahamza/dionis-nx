//عند الضغط على كتلر سي يتكرر النتائج




var util = util || {};
util.toArray = function(list) {
  return Array.prototype.slice.call(list || [], 0);};
var IP='10.0.77.11';
var session=2;
var users='cli';
var password='cli';
var adminSession=2;
var AdminPassword="adm";
var configure=1;
var hostname ="baraa";
var interfaces= [];
var MASK=24;
var currectInterface="";
var routeTable=[];
routeTable[0]="";
var interfaceNames= ['ethernet0','ethernet1','ethernet2','ethernet3','ethernet4','ethernet5','ethernet6','ethernet7','ethernet8','ethernet9','ethernet10','ethernet11'];
var portsIps=       ['10.10.1.1','10.10.2.1','10.10.3.1','10.10.4.1','10.10.5.1','10.10.6.1','10.10.7.1','10.10.8.1','10.10.9.1','10.10.10.1','10.10.11.1','10.10.12.1'];
var Terminal = Terminal || function(cmdLineContainer, outputContainer) {
  window.URL = window.URL || window.webkitURL;
  window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

  var cmdLine_ = document.querySelector(cmdLineContainer);
  var output_ = document.querySelector(outputContainer);
    
  const CMDS_ = [
    'arping','clear' ,'copy','enable','exit','help','less','ls','mkdir','ping','rm','show','ssh','telnet','traceroute','whois'];

  
  const ConfigCMDS_ = [
    'cluster','controller','crypto','do','end','exit','help' ,
'hostname','interface','ip','net','no','os','router' ,
'service','session','timezone' 
  ];
  const ConfigAdminCMDS_= ['аrping','boot','cat','clear','clock' ,
'сluster','configure','copy','crypto','disable' ,
'echo','integrity','interface','iperf','less' ,
'ls','mkdir','netperf','no','nslookup' ,
'os','passwd','passwd-expiry','ping','poweroff' ,
'reboot','rm','schedule','service','show' ,
'ssh','sysmon','tcpdump','telnet','top' ,
'traceroute','watchdog','whois','write',
    ];
  const CMDSWithEx_ = [
  'arping      Send ARP request',
'clear         Reset functions   ',
'copy         Copy from one file to another   ',
'enable      Turn on privileged commands   ',
'exit           Exit from the CLI   ',
'help          Help about command line interface  ' ,
'less           Display the contents of a file   ',
'ls               List files on a filesystem'   ,
'mkdir        Create directory   ',
'ping          Send echo messages   ',
'rm             Delete file   ',
'show         Show system information   ',
'ssh             SSH client   ',
'telnet         Telnet client   ',
'traceroute  Trace route to destination   ',
'whois         Get whois information',
  ];

  var help='<div style="height: auto;    -webkit-column-width: unset;  -moz-column-width: unset;  -o-column-width: unset;  column-width: unset;"><p>cat       <span style="padding-left:30px;">     Display the contents of a file   </span></p><p> arping    <span style="padding-left:30px;">  Send ARP request</span></p><p>clear     <span style="padding-left:30px;">    Reset functions   </span></p><p>copy       <span style="padding-left:30px;">    Copy from one file to another   </span></p><p>echo     <span style="padding-left:30px;">    Print message on screen   </span></p><p>enable    <span style="padding-left:30px;">  Turn on privileged commands   </span></p><p>exit      <span style="padding-left:30px;">     Exit from the CLI   </span></p><p>help      <span style="padding-left:30px;">    Help about command line interface   </span></p><p>less      <span style="padding-left:30px;">     Display the contents of a file   </span></p><p>ls        <span style="padding-left:30px;">       List files on a filesystem   </span></p><p>mkdir     <span style="padding-left:30px;">   Create directory   </span></p><p>ping      <span style="padding-left:30px;">    Send echo messages   </span></p><p>rm        <span style="padding-left:30px;">     Delete file   </span></p><p>show      <span style="padding-left:30px;">   Show system information   </span></p><p>ssh       <span style="padding-left:30px;">      SSH client   </span></p><p>telnet         Telnet client   </span></p><p>traceroute <span style="padding-left:30px;"> Trace route to destination   </span></p><p>whois      <span style="padding-left:30px;">   Get whois information </span></p>';

  var fs_ = null;
  var cwd_ = null;
  var history_ = [];
  var histpos_ = 0;
  var histtemp_ = 0;

  window.addEventListener('click', function(e) {
    cmdLine_.focus();
  }, false);

  cmdLine_.addEventListener('click', inputTextClick_, false);
  cmdLine_.addEventListener('keydown', historyHandler_, false);
  cmdLine_.addEventListener('keydown', processNewCommand_, false);

  //
  function inputTextClick_(e) {
    this.value = this.value;
  }

  //
  function historyHandler_(e) {
    if (history_.length) {
      if (e.keyCode == 38 || e.keyCode == 40) {
        if (history_[histpos_]) {
          history_[histpos_] = this.value;
        } else {
          histtemp_ = this.value;
        }
      }

      if (e.keyCode == 38) { // up
        histpos_--;
        if (histpos_ < 0) {
          histpos_ = 0;
        }
      } else if (e.keyCode == 40) { // down
        histpos_++;
        if (histpos_ > history_.length) {
          histpos_ = history_.length;
        }
      }

      if (e.keyCode == 38 || e.keyCode == 40) {
        this.value = history_[histpos_] ? history_[histpos_] : histtemp_;
        this.value = this.value; // Sets cursor to end of input.
      }
    }
  }


  //
  function processNewCommand_(e) {
    var line = this.parentNode.parentNode.cloneNode(true);
    line.removeAttribute('id')
    line.classList.add('line');
    var input = line.querySelector('input.cmdline');
      if (e.keyCode == 13 || e.keyCode == 9) { // enter
      $('#container').animate({scrollTop: $('#container')[0].scrollHeight});
      input.autofocus = false;
      input.readOnly = true;
      output_.appendChild(line);
       var vall=this.value.trim().replace(/ +(?= )/g,'').toLowerCase();
      if(session!=2){
          if(session==0){
            $('input.cmdline').val("");
             if(vall!=users){
                return output(vall+':The login is wrong!');
             }else{
                $('input.cmdline:last').addClass("hiddenText");
                session=1;
                $('.prompt:last').html(users+'@'+IP+'\'s password:: ');
             }
          }else if(session==1){
            $('input.cmdline').val("");
            if(vall!=password){
              $('.prompt:last').html('DionisNX login as: ');
              $('input.cmdline:last').removeClass("hiddenText");
              session=0;
              return output(':The password is wrong!');
           }else{
              session=2;
              $('.prompt:last').html('DionisNX>');
              $('input.cmdline:last').removeClass("hiddenText");
           }
          }
      return;
    }
      if(adminSession!=2 ){
        if(adminSession==0){
          if(vall=='enable'){
            adminSession=1;
            $('input.cmdline').val("");
            $('input.cmdline:last').addClass("hiddenText");
            $('.prompt:last').html('Password:');
          }
        }else if (adminSession==1){
          $('input.cmdline').val("");
          if(vall!=AdminPassword){
            $('input.cmdline:last').removeClass("hiddenText");
            adminSession=0;  $('.prompt:last').html('DionisNX>');
            return output(':The password is wrong!');
          
         }else{
          adminSession=2;
            $('.prompt:last').html('DionisNX#');
            $('input.cmdline:last').removeClass("hiddenText");
         }
        }
      }
      if (e.keyCode == 9) {// tab
        e.preventDefault();
        if(input.value==""){
          if(configure==1){
            output('<div class="ls-files">' + ConfigCMDS_.join('<br>') + '</div>');
          }else{
            output('<div class="ls-files">' + CMDS_.join('<br>') + '</div>');
          }
          
        }else{
        var similars = [];
        if(configure==1){
          if(vall=='do'){
            output('<div class="ls-files">' + ConfigAdminCMDS_.join('<br>') + '</div>');
          }
          $.each(ConfigCMDS_, function (i, v) {
            let re = new RegExp('^' +input.value,'i');
              if (v.match(re)) {
                similars.push(v);
              }
          });
        }else{
          $.each(CMDS_, function (i, v) {
            let re = new RegExp('^' +input.value,'i');
              if (v.match(re)) {
                similars.push(v);
              }
          });
        }
        
        if(similars.length==1){
          input.value=similars[0];
          this.value=similars[0];

        }else if(similars.length>1){
          output('<div class="ls-files">' + similars.join('<br>') + '</div>');
          input.value='';  this.value='';
          return;
        }
        }
        return;
      }

       if (this.value) {
          history_[history_.length] = this.value;
          histpos_ = history_.length;
        }
        if (this.value && this.value.trim()) {
          var args = this.value;
          var cmd = args.toLowerCase();
          // args = args.splice(1); // Remove cmd from arg list.
        }
        if(configure==1){
          $('input.cmdline:last').val("");
          if(vall.startsWith("hostname ")){
            hostname=vall.replace(/hostname /g,'');
            
            $('.prompt:last').html(hostname+'(config)#');
            $('input.cmdline:last').removeClass("hiddenText");
            return;
          }
          if(vall.startsWith("interface ")){
            // $('input.cmdline:last').val("");
            $('input.cmdline:last').removeClass("hiddenText");
            if(hostname==""){
            return output("You have to enter hostname!");
            }
             currectInterface=vall.replace(/interface /g,'').replace(/\s/g,'');
             if(interfaceNames.indexOf(currectInterface)==-1){
              return output("You have to enter correct interface!");
             }
             //interfaceNames
             if (typeof interfaces[currectInterface] === 'undefined') {
               interfaces[currectInterface]= [] ;
             }
             
            $('.prompt:last').html(hostname+'(config-if-'+currectInterface+')#');
            return;
          }
           
        if(currectInterface!=""){
              if(vall.startsWith("ip address ")){
              if(currectInterface in interfaces)   {
            var currectIp=vall.replace(/ip address /g,'');
            // $('input.cmdline:last').val("");
            $('input.cmdline:last').removeClass("hiddenText");
            if(ValidateIPaddress(currectIp)){
              interfaces[currectInterface].ip =clearIPAddress(currectIp,false);
             return output('ip address '+  interfaces[currectInterface].ip);
            }else{
            return  output("You have entered an invalid IP address!");
            }
            }
          }
          if(vall=='enable'){
            if('ip' in interfaces[currectInterface]  && interfaces[currectInterface].ip!="")   {
              interfaces[currectInterface].enable=1;
              // $('input.cmdline:last').val("");
            }else{
              // $('input.cmdline:last').val("");
              output('you have to set ip address');
            }
            return;
          }
          if(vall=='disable'){
            if('ip' in interfaces[currectInterface]  && interfaces[currectInterface].ip!="")   {
              interfaces[currectInterface].enable=0;
              // $('input.cmdline:last').val("");
            }else{
              // $('input.cmdline:last').val("");
                output('you have to set ip address');
            }
            return;
          }
          if(vall=='exit'){
            // $('input.cmdline:last').val("");
            $('input.cmdline:last').removeClass("hiddenText");
             currectInterface="";
            $('.prompt:last').html(hostname+'(config)#');
            return;
          }
          if(vall.startsWith("do ping ")){
            // // check if enabled
            if(! 'enable' in interfaces[currectInterface]  || interfaces[currectInterface].enable!=1)   {
              return doPING(ipToPing,false);
            }
            if(!'ip' in interfaces[currectInterface]  || interfaces[currectInterface].ip=="")   {
              return doPING(ipToPing,false);
            }
              
            var ipToPing=vall.replace(/do ping /g,'');
            if(ValidateIPaddress(ipToPing+'/24')==false){
            return  output("You have entered an invalid IP address!");
            }
            ipToPing=clearIPAddress(ipToPing);
            var sliptd=interfaces[currectInterface].ip.split('/');
            if(sliptd[1]!=MASK){
              return doPING(ipToPing,false);
            }
          
 
            if(checkSettings(interfaces,MASK,portsIps,interfaceNames,currectInterface,ipToPing)){
              return doPING(ipToPing,true);
            }
      //  check if one of interfaces is defualt
            if(routeTable[0]!= '' && typeof routeTable[0]!== "undefined"){
              // || routeTable[0]==ipToPing
              
              if(routeTable[0]==sliptd[0]){//if this interface is default
                  if(ipToPing==sliptd[0]){//if self ping
                  return doPING(ipToPing,false);
                  }
                  // get target interface
                  var rest = ipToPing.substring(0, ipToPing.lastIndexOf(".") + 1)+'1';
                   if(checkSettings(interfaces,MASK,portsIps,interfaceNames,interfaceNames[portsIps.indexOf(rest)],rest)!=true){
                    return doPING(ipToPing,false);
                   }
                  // if ! isset target
                   if(interfaces[interfaceNames[portsIps.indexOf(rest)]].ip!=ipToPing+'/'+MASK && ipToPing != rest){
                    return doPING(ipToPing,false);
                   }

                return doPING(ipToPing,true);
              } 
              else{
                var rest = ipToPing.substring(0, ipToPing.lastIndexOf(".") + 1);
                var last = ipToPing.substring(ipToPing.lastIndexOf(".") + 1, ipToPing.length);
                var n = routeTable[0].startsWith(rest);
                if(n == true ){///if pinging defualt interface
                  if(checkSettings(interfaces,MASK,portsIps,interfaceNames,interfaceNames[portsIps.indexOf(rest + '1')],rest + '1')!=true){
                    return doPING(ipToPing,false);
                   }
                    // if isset target
                  if(last=='1'){return doPING(ipToPing,true);}
                  if(interfaces[interfaceNames[portsIps.indexOf(rest + '1')]].ip==ipToPing+'/'+MASK){return doPING(ipToPing,true);}
                }
              }
            }
      // check if routed togather 
          var targ = ipToPing.substring(0, ipToPing.lastIndexOf(".") + 1) + '1';
          var from = sliptd[0].substring(0, sliptd[0].lastIndexOf(".") + 1) + '1';
          var last = ipToPing.substring(ipToPing.lastIndexOf(".") + 1, ipToPing.length);
           if(routeTable.indexOf(from+' - '+targ)!= -1 || routeTable.indexOf(targ+' - '+from)!= -1){
            if(checkSettings(interfaces,MASK,portsIps,interfaceNames,interfaceNames[portsIps.indexOf(targ)],targ)!=true){
              return doPING(ipToPing,false);
             }
             if(last=='1'){return doPING(ipToPing,true);}
             if(interfaces[interfaceNames[portsIps.indexOf(targ)]].ip==ipToPing+'/'+MASK){return doPING(ipToPing,true);}
           }
            return doPING(ipToPing,false);
          }

           
         }else{
          
            if(vall.startsWith("ip route ")){
                var targets=vall.replace(/ip route /g,'').split(' ');
                if(targets.length!=2){return output(cmd + ': command not found');}
                if(targets[0]=='default'){
                      if(ValidateIPaddress(targets[1]+'/24')==false){return  output("You have entered an invalid IP address!");}
                      if(portsIps.indexOf(clearIPAddress(targets[1]))!=-1) { return  output("You have entered an invalid IP address!");}
                      routeTable[0]=clearIPAddress(targets[1]);
                      return output(vall);
                }
                else{
                    if(ValidateIPaddress(targets[1]+'/24')==false || ValidateIPaddress(targets[0]+'/24')==false){
                      return  output("You have entered an invalid IP address!");
                    }
                    targets[0]= clearIPAddress(targets[0]);
                    targets[1]=clearIPAddress(targets[1]);
                    if(portsIps.indexOf(targets[1])==-1 || portsIps.indexOf(targets[0])==-1) { return  output("You have entered an invalid IP address!");}
                     if(targets[0]==targets[1]){return  output("You have entered an invalid IP address!");}
                    routeTable.push(targets[0]+' - '+targets[1]);
                    output(vall);
                }
              
            }
            if(vall=='do show ip route'){
                output('Codes: K - kernel route, C - connected, S - static, R - RIP, ');
                output('O - OSPF, I - IS-IS, B - BGP, A - Babel,> - selected route, * - FIB route ');
                output('O - OSPF, I - IS-IS, B - BGP, A - Babel,> - selected route, * - FIB route ');
                if(routeTable[0]!= '' && typeof routeTable[0]!== "undefined"){
                  output('S>* 0.0.0.0/0 [1/0] via '+routeTable[0]+', '+interfaceNames[portsIps.indexOf(routeTable[0])]);
                }
                portsIps.forEach(interFunction);
                function interFunction(item, index) {
                  output('C>* '+item+'/'+MASK+' is directly connected,  '+interfaceNames[portsIps.indexOf(item)] ); 
                }
                output('C>* 127.0.0.0/8 is directly connected, lo' ); 
                routeTable.forEach(conFunction);
                function conFunction(item, index) {
                  if(index!=0){
                    var sibilings=item.split(' - ');
                  output('S>* '+sibilings[0]+'/'+MASK+' [1/0] via '+sibilings[1]+',  '+interfaceNames[portsIps.indexOf(sibilings[1])] ); }
                }
  }
         }
          switch (cmd) {
         
            case 'exit':
              $('input.cmdline:last').val("");
              $('input.cmdline:last').removeClass("hiddenText");
              $('.prompt:last').html('DionisNX>');
              configure=0;
            break;
            case 'do show':
            if(currectInterface!=""){
              if(currectInterface in interfaces)   {
                if('ip' in interfaces[currectInterface]  && interfaces[currectInterface].ip!="")   {
                  output('ip address '+interfaces[currectInterface].ip);
                }
              }
            }
            break;
            case 'do show enable':
            if(currectInterface!=""){
              if(currectInterface in interfaces)   {
                if('ip' in interfaces[currectInterface] && interfaces[currectInterface].ip!="")   {
                  output('ip address '+interfaces[currectInterface].ip);
                }
              }
            }
            break;
            default:
              output(cmd + ': command not found');
          }
         
          function doPING(target,result=true){
            if(result!=true){
              // $('input.cmdline:last').val("");
              return output('network address unreachable ');
            }
            $('#input-line').hide();
            // $('input.cmdline:last').val("");
            var seq=0,random,totalRandom=[];
            var myVar = setInterval(timer, 500);
             
            function timer(){
              random=Math.floor(Math.random() * 12) + 8 ;
              random=random+(Math.floor(Math.random() * 10) + 1)/100;
              totalRandom.push(random);
              output('PING '+target+' ('+target+'): 56 data bytes ');
                output('64 bytes from '+target+': seq='+seq+' ttl=64 time='+random+' ms');
              $('#input-line').hide();
              seq++;
              $('#container').animate({ 
               scrollTop: $('#container')[0].scrollHeight});
            }
            ifC();
            function ifC(){
              var ctrlDown = false,
                  ctrlKey = 17,
                  cmdKey = 91,
                  cKey = 67,
                  ifRun=405;//start and off this event
                  $(document).on('keydown',function(e) {
                    if (e.keyCode == ctrlKey || e.keyCode == cmdKey) ctrlDown = true;
                    if (ctrlDown && ( e.keyCode == cKey)) {
                      if(ifRun == 405){
                      myStopFunction()
                      ifRun=202;}
                    };
                })
            }
            function myStopFunction() {
              clearInterval(myVar);
              var sum, avg = 0;
            // dividing by 0 will return Infinity
            // totalRandom must contain at least 1 element to use reduce
            if (totalRandom.length)
            {
                sum = totalRandom.reduce(function(a, b) { return a + b; });
                avg = sum / totalRandom.length;
            }
  
              output(' --- '+target+' ping statistics --- ');
              output(seq+' packets transmitted, '+seq+' packets received, 0% packet loss round-trip min/avg/max = '+Math.min.apply(Math, totalRandom)+'/'+avg+'/'+Math.max.apply(Math, totalRandom));
              $('#input-line').show();
           
            //   $(document).undelegate('keydown',function(e) {
            //     if (e.keyCode == ctrlKey || e.keyCode == cmdKey) ctrlDown = true;
            //     if (ctrlDown && ( e.keyCode == cKey)) {myStopFunction()};
            // })
            }
          }

  }
  else{
          if( adminSession == 2 && vall=='configure terminal'){
            configure=1;
            $('input.cmdline:last').val("");
            $('.prompt:last').html('DionisNX(config)#');
            $('input.cmdline:last').removeClass("hiddenText");
            return;
          }
          switch (cmd) {////if not config
            case 'clear':
              output_.innerHTML = '';
              this.value = '';
              return;
            case 'clock':
              var appendDiv = jQuery($('.clock-container')[0].outerHTML);
              appendDiv.attr('style', 'display:inline-block');
              output_.appendChild(appendDiv[0]);
              break;
            case 'date':
              output( new Date() );
              break;
            case 'tab':
              output('<div class="ls-files">' + CMDS_.join('<br>') + '</div>');
              break;
              case 'help':
              output('<div class="ls-files">' + CMDS_.join('<br>') + '</div>');
              break;
              case '?':
              output(help);
              break;
            case 'whoami':
              var result = "<img src=\"" + codehelper_ip["Flag"]+ "\"><br><br>";
              for (var prop in codehelper_ip)
                result += prop + ": " + codehelper_ip[prop] + "<br>";
              output(result);
              break;
            default:
              if (cmd) {
                output(cmd + ': command not found');
              }
          };
        }    
      window.scrollTo(0, getDocHeight_());
      this.value = ''; // Clear/setup line for next input.
    }
  }
  //
  function formatColumns_(entries) {
    var maxName = entries[0].name;
    util.toArray(entries).forEach(function(entry, i) {
      if (entry.name.length > maxName.length) {
        maxName = entry.name;
      }
    });
    var height = entries.length <= 3 ?
        'height: ' + (entries.length * 15) + 'px;' : '';

    // 12px monospace font yields ~7px screen width.
    var colWidth = maxName.length * 7;

    return ['<div class="ls-files" style="-webkit-column-width:',
            colWidth, 'px;', height, '">'];
  }
  //
  function output(html) {
    output_.insertAdjacentHTML('beforeEnd', '<p>' + html + '</p>');
  }
  // Cross-browser impl to get document's height.
  function getDocHeight_() {
    var d = document;
    return Math.max(
        Math.max(d.body.scrollHeight, d.documentElement.scrollHeight),
        Math.max(d.body.offsetHeight, d.documentElement.offsetHeight),
        Math.max(d.body.clientHeight, d.documentElement.clientHeight)
    );
  }
  //
  return {
    init: function() {
        
     var dateTime= new Date();
     var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
     
     output('<p>Filesystem integrity:6dsfesdd548s5e8ds8t4zh8i4fwee8q1gf8o7s2g4i4op5m4p</p>');

      output('<p>Checking data for sanity...</p><p>Loading custom modules...</p><p>Renaming interfaces...</p><p>Starting lcd daemon...</p><p>Starting monit daemon...</p><p>Starting konfd daemon...</p><p>Starting dilogd daemon...</p><p>Starting crypto subsystem...</p><p>Initializing DISEC subsystem...</p><p>Initializing DNS service...</p><p>Initializing DNCP service...</p><p>Initializing SNMP service...</p><p>Initializing PROXY service...</p><p>Initializing Slagent service...</p><p>Initializing IDS service...</p><p>Starting router...</p><p>Starting dish subsystem...</p><p>Info: Setting primary IP : '+ IP +'/24</p><p>Info: Using default root zone dated by '+dateTime.getDate() +months[dateTime.getMonth()]+ ","+ dateTime.getFullYear()	  + '</p></br><p>Welcome to DionisNX</p>');
      
    },
    output: output
  }
};

$(function() {

  if(session==2){
    $('.prompt').html('DionisNX>')
  }else{
    $('.prompt').html('DionisNX login as: ');}
  // Initialize a new terminal object
  var term = new Terminal('#input-line .cmdline', '#container output');
  term.init();
  // Update the clock every second
  setInterval(function() {
    function r(cls, deg) {
      $('.' + cls).attr('transform', 'rotate('+ deg +' 50 50)')
    }
    var d = new Date()
    r("sec", 6*d.getSeconds())  
    r("min", 6*d.getMinutes())
    r("hour", 30*(d.getHours()%12) + d.getMinutes()/2)
  }, 1000);
});
$(document).ready(function(){
  $('#container').animate({
                     scrollTop: $('#container')[0].scrollHeight}); 
});
function ValidateIPaddress(inputText)
 {
 var ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\/(2[0-8]|1[0-9]|[0][1-9]|[1-9])$/;
 if(inputText.match(ipformat))
 { return true; }
 else {return false;
 }
}
function clearIPAddress(inputText,clearMask=true){
var ip=inputText.split('/')[0];
ip=ip.split('.');
if(clearMask == true){
  return Number(ip[0])+'.'+ Number(ip[1])+'.'+ Number(ip[2])+'.'+ Number(ip[3])
}
  var mask=inputText.split('/')[1];
  return Number(ip[0])+'.'+ Number(ip[1])+'.'+ Number(ip[2])+'.'+ Number(ip[3]) + '/' + mask
}

function checkSettings(interfaces,MASK,portsIps,interfaceNames,currectInterface,ipToPing){
      if (typeof interfaces[currectInterface] == "undefined") {
        return false;
    }
  // check if enabled
    if(! 'enable' in interfaces[currectInterface]  || interfaces[currectInterface].enable!=1)   {
        return false;
      }
      if(!'ip' in interfaces[currectInterface]  || interfaces[currectInterface].ip=="")   {
        return false;
      }
    ipToPing=clearIPAddress(ipToPing);
      var sliptd=interfaces[currectInterface].ip.split('/');
      if(sliptd[1]!=MASK){
        return false;
      }
      ///check current interface
      if(ipToPing==portsIps[interfaceNames.indexOf(currectInterface)]){
     
        var currectIpSplitWithoutMask=sliptd[0].split('.'),
            portIpSplitWithoutMask=ipToPing.split('.');
        if(currectIpSplitWithoutMask[0]==portIpSplitWithoutMask[0]){
          if(currectIpSplitWithoutMask[1]==portIpSplitWithoutMask[1]){
            if(currectIpSplitWithoutMask[2]==portIpSplitWithoutMask[2]){
              if(currectIpSplitWithoutMask[3]!=portIpSplitWithoutMask[3]){
                return true;
              }
            }
          }
        }
      }
      return false;
}