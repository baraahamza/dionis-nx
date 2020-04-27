
String.prototype.splice = function(idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
  };
  function doShowAll(){
   
    var resp='!<br>! $System: DionisNX<br>! $Version: 1.2-6<br>! $Date: '+new Date().toISOString().split('T')+'<br>!  <br>timezone MSK-3<br>!<br>hostname '+hostname+'<br>!<br>ip path-mtu-discovery<br>ip tcp ecn server-mode<br>ip tcp selective-ack<br>ip tcp syncookies<br>ip tcp timestamps<br>ip tcp window-scaling<br>!<br>ip access-group no-invalid forward<br>!<br>ip class-map prt0<br> 1 match tos 0/0xe0<br>!<br>ip class-map prt1<br> 1 match tos 0x20/0xe0<br>!<br>ip class-map prt2<br> 1 match tos 0x40/0xe0<br>!<br>ip class-map prt3<br> 1 match tos 0x60/0xe0<br>!<br>ip class-map prt4<br> 1 match tos 0x80/0xe0<br>!<br>ip class-map prt5<br> 1 match tos 0xa0/0xe0<br>!<br>ip class-map prt6<br> 1 match tos 0xc0/0xe0<br>!<br>ip class-map prt7<br> 1 match tos 0xe0/0xe0<br>!<br>ip policy-map prio<br> class prt0 rate 1kbit ceil 10000mbit priority 7 tos 0x00/0xe0<br> class prt1 rate 1kbit ceil 10000mbit priority 6 tos 0x20/0xe0<br> class prt2 rate 1kbit ceil 10000mbit priority 5 tos 0x40/0xe0<br> class prt3 rate 1kbit ceil 10000mbit priority 4 tos 0x60/0xe0<br> class prt4 rate 1kbit ceil 10000mbit priority 3 tos 0x80/0xe0<br> class prt5 rate 1kbit ceil 10000mbit priority 2 tos 0xa0/0xe0<br> class prt6 rate 1kbit ceil 10000mbit priority 1 tos 0xc0/0xe0<br>class prt7 rate 1kbit ceil 10000mbit priority 0 tos 0xe0/0xe0<br>!<br>';
    interfaceNames.forEach(function(item){
      // var interface= ;// ethernet 0-10
      resp+='interface '+ item.splice(8, 0, " ") + '<br>';
        if(item in interfaces){
          if( 'enable' in interfaces[item]  || interfaces[item].enable==1)   {
            resp+='enable<br> ';
  
          }
          if('ip' in interfaces[item]  && interfaces[item].ip!="")   {
              resp+='ip address '+ interfaces[item].ip + '<br> ';
          }
        }
        resp+='!<br> ';
  
    });
    resp+='ip route 0.0.0.0/0 172.21.62.129<br>!<br>ip access-list no-invalid<br> 1 deny state invalid<br>!<br>service log<br> log<br>trace all<br> size 262144 131072<br> alert beep<br>!<br>service dns<br> 1 view default<br> auto-local-zones<br> zone .<br>   auto static<br>!<br>service ntp<br>1 server 0.ru.pool.ntp.org<br>2 server 1.ru.pool.ntp.org<br>3 server 2.ru.pool.ntp.org<br>4 server 3.ru.pool.ntp.org<br>!<br>service ssh<br>permit-adm-login<br>enable<br>!<br>ip forwarding';
  return resp
  }
  
  $(function() {

    if (session == 2) {
        $('.prompt').html(hostname + '>')
    } else {
        $('.prompt').html(hostname + ' login as: ');
    }
    // Initialize a new terminal object
    var term = new Terminal('#input-line .cmdline', '#container output');
    term.init();
    // Update the clock every second
    setInterval(function() {
        function r(cls, deg) {
            $('.' + cls).attr('transform', 'rotate(' + deg + ' 50 50)')
        }
        var d = new Date()
        r("sec", 6 * d.getSeconds())
        r("min", 6 * d.getMinutes())
        r("hour", 30 * (d.getHours() % 12) + d.getMinutes() / 2)
    }, 1000);
});
$(document).ready(function() {
    goDown();
});

function ValidateIPaddress(inputText) {
    var ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\/(2[0-8]|1[0-9]|[0][1-9]|[1-9])$/;
    if (inputText.match(ipformat)) {
        return true;
    } else {
        return false;
    }
}

function clearIPAddress(inputText, clearMask = true) {
    var ip = inputText.split('/')[0];
    ip = ip.split('.');
    if (clearMask == true) {
        return Number(ip[0]) + '.' + Number(ip[1]) + '.' + Number(ip[2]) + '.' + Number(ip[3])
    }
    var mask = inputText.split('/')[1];
    return Number(ip[0]) + '.' + Number(ip[1]) + '.' + Number(ip[2]) + '.' + Number(ip[3]) + '/' + mask
}

function goDown() {
    $('#container').animate({
        scrollTop: $('#container')[0].scrollHeight
    });
    return;
}

function checkSettings(interfaces, MASK, portsIps, interfaceNames, currectInterface, ipToPing) {
    if (typeof interfaces[currectInterface] == "undefined") {
        return false;
    }
    // check if enabled
    if (!'enable' in interfaces[currectInterface] || interfaces[currectInterface].enable != 1) {
        return false;
    }
    if (!'ip' in interfaces[currectInterface] || interfaces[currectInterface].ip == "") {
        return false;
    }
    ipToPing = clearIPAddress(ipToPing);
    var sliptd = interfaces[currectInterface].ip.split('/');
    if (sliptd[1] != MASK) {
        return false;
    }
    ///check current interface
    if (ipToPing == portsIps[interfaceNames.indexOf(currectInterface)]) {

        var currectIpSplitWithoutMask = sliptd[0].split('.'),
            portIpSplitWithoutMask = ipToPing.split('.');
        if (currectIpSplitWithoutMask[0] == portIpSplitWithoutMask[0]) {
            if (currectIpSplitWithoutMask[1] == portIpSplitWithoutMask[1]) {
                if (currectIpSplitWithoutMask[2] == portIpSplitWithoutMask[2]) {
                    if (currectIpSplitWithoutMask[3] != portIpSplitWithoutMask[3]) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

function interfaceBindings(){
    var resp="";
    interfaceNames.forEach(function(item,index){
        resp+=item + ' '+ interfaceMacs[index] + '<br>';
    });
    return resp;
}