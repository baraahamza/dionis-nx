var util = util || {};
util.toArray = function(list) {
  return Array.prototype.slice.call(list || [], 0);};
var IP='10.0.77.11';
var session=0;
var users='cli';
var password='cli';
var adminSession=0;
var AdminPassword="adm";
var configure=0;
var hostname ="NX-1";
var interfaces= [];
var MASK=24;
var currectInterface="";
var routeTable=[];
routeTable[0]="";
var interfaceNames= ['ethernet0','ethernet1','ethernet2','ethernet3','ethernet4','ethernet5','ethernet6','ethernet7','ethernet8','ethernet9'];
var portsIps=       ['10.10.1.1','10.10.2.1','10.10.3.1','10.10.4.1','10.10.5.1','10.10.6.1','10.10.7.1','10.10.8.1','10.10.9.1','10.10.10.1','10.10.11.1','10.10.12.1'];
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

  var dateTime = new Date();
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var startsInfo='<p>Filesystem integrity:6dsfesdd548s5e8ds8t4zh8i4fwee8q1gf8o7s2g4i4op5m4p</p><p>Checking data for sanity...</p><p>Loading custom modules...</p><p>Renaming interfaces...</p><p>Starting lcd daemon...</p><p>Starting monit daemon...</p><p>Starting konfd daemon...</p><p>Starting dilogd daemon...</p><p>Starting crypto subsystem...</p><p>Initializing DISEC subsystem...</p><p>Initializing DNS service...</p><p>Initializing DNCP service...</p><p>Initializing SNMP service...</p><p>Initializing PROXY service...</p><p>Initializing Slagent service...</p><p>Initializing IDS service...</p><p>Starting router...</p><p>Starting dish subsystem...</p><p>Info: Setting primary IP : ' + IP + '/24</p><p>Info: Using default root zone dated by ' + dateTime.getDate() + months[dateTime.getMonth()] + "," + dateTime.getFullYear() + '</p></br><p>Welcome to DionisNX</p>';