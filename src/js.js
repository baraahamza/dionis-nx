

var Terminal = Terminal || function(cmdLineContainer, outputContainer) {
    window.URL = window.URL || window.webkitURL;
    window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

    var cmdLine_ = document.querySelector(cmdLineContainer);
    var output_ = document.querySelector(outputContainer);

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
        
        var vall = this.value.trim().replace(/ +(?= )/g, '');
        if (!vall.startsWith("hostname ")) {
            vall=vall.toLowerCase();
        }
        
        if (e.keyCode == 191 && vall == "" && session == 2) { // key=> ?
            e.preventDefault();
            output(help);
            goDown();
        }

        if (e.keyCode == 9) { // tab
            e.preventDefault();
            if (input.value == "") {
                if (configure == 1) {
                    output('<div class="ls-files">' + ConfigCMDS_.join('<br>') + '</div>');
                } else {
                    output('<div class="ls-files">' + CMDS_.join('<br>') + '</div>');
                }
                goDown();
                return;
            } else {
                var similars = [];
                if (configure == 1) {
                    if (vall == 'do') {
                        // return
                        output('<div class="ls-files">' + ConfigAdminCMDS_.join('<br>') + '</div>');
                        goDown();
                        return
                    }
                    // $.each(ConfigCMDS_, function (i, v) {
                    //   let re = new RegExp('^' +input.value,'i');
                    //     if (v.match(re)) {
                    //       similars.push(v);
                    //     }
                    // });
                } else {
                    $.each(CMDS_, function(i, v) {
                        let re = new RegExp('^' + input.value, 'i');
                        if (v.match(re)) {
                            similars.push(v);
                        }
                    });
                }

                if (similars.length == 1) {
                    input.value = similars[0];
                    this.value = similars[0];
                    return;
                } else if (similars.length > 1) {
                    output('<div class="ls-files">' + similars.join('<br>') + '</div>');
                    input.value = '';
                    this.value = '';
                    return;
                }
            }
            return;
        }
        if (e.keyCode == 13 || e.keyCode == 9) { // enter
            if(vall == ''){return}
             goDown();
            input.autofocus = false;
            input.readOnly = true;
            output_.appendChild(line);
           
              
            if (session != 2) {
                if (session == 0) {
                    $('input.cmdline').val("");
                    if (vall != users) {
                        return output(vall + ':The login is wrong!');
                    } else {
                        $('input.cmdline:last').addClass("hiddenText");
                        session = 1;
                        $('.prompt:last').html(users + '@' + IP + '\'s password:: ');
                    }
                } else if (session == 1) {
                    $('input.cmdline').val("");
                    if (vall != password) {
                        $('.prompt:last').html(hostname + ' login as: ');
                        $('input.cmdline:last').removeClass("hiddenText");
                        session = 0;
                        return output(':The password is wrong!');
                    } else {
                        session = 2;
                        $('.prompt:last').html(hostname + '>');
                        $('input.cmdline:last').removeClass("hiddenText");
                    }
                }
                return;
            }
            if (adminSession != 2) {
                if (adminSession == 0) {
                    if (vall == 'enable') {
                        adminSession = 1;
                        // $('input.cmdline').val("");
                        $('input.cmdline:last').addClass("hiddenText").val("");
                        $('.prompt:last').html('Password:');
                        return output('');
                    }
                } else if (adminSession == 1) {
                    // $('input.cmdline').val("");
                    // alert(vall);
                    if (vall != AdminPassword) {
                        $('input.cmdline:last').removeClass("hiddenText");
                        adminSession = 0;
                        $('.prompt:last').html(hostname + '>');
                        output(':The password is wrong!');
                        $('input.cmdline:last').val("");
                        return
                    } else {
                        adminSession = 2;
                        $('.prompt:last').html(hostname + '#');
                        $('input.cmdline:last').removeClass("hiddenText").val("");
                        return;
                    }
                }
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

            if (configure == 1) {

                $('input.cmdline:last').val("");
                if (vall == 'do') {
                    return output('<div class="ls-files">' + ConfigAdminCMDS_.join('<br>') + '</div>');
                }
                if (vall.startsWith("hostname ")) {
                    hostname = vall.replace(/hostname /g, '');
                    if (hostname.indexOf('-') > -1) {
                        var sp = hostname.split('-');
                        if ((typeof sp[0] != 'undefined' && sp[0].length > 0) && (typeof sp[1] != 'undefined' && sp[1].length > 0)) {
                            $('.prompt:last').html(hostname + '(config)#');
                            $('input.cmdline:last').removeClass("hiddenText");
                            return;
                        }
                    }
                    return output("Syntax error: Illegal parameter");
                }
                if (vall.startsWith("interface ")) {
                    // $('input.cmdline:last').val("");
                    $('input.cmdline:last').removeClass("hiddenText");
                    if (hostname == "") {
                        return output("You have to enter hostname!");
                    }
                    currectInterface = vall.replace(/interface /g, '').replace(/\s/g, '');
                    if (interfaceNames.indexOf(currectInterface) == -1) {
                        // return output("You have to enter correct interface!");
                    }
                    //interfaceNames
                    if (typeof interfaces[currectInterface] === 'undefined') {
                        interfaces[currectInterface] = [];
                    }

                    $('.prompt:last').html(hostname + '(config-if-' + currectInterface + ')#');
                    return;
                }
                if(vall == 'show interface bindings'){
                      return output(interfaceBindings());
                }

                if (currectInterface != "") {
                    if (vall.startsWith("ip address ")) {
                        if (currectInterface in interfaces) {
                            var currectIp = vall.replace(/ip address /g, '');
                            // $('input.cmdline:last').val("");
                            $('input.cmdline:last').removeClass("hiddenText");
                            if (ValidateIPaddress(currectIp)) {
                                var msg;
                                if ('ip' in interfaces[currectInterface] && interfaces[currectInterface].ip != "") {
                                    msg = 'Info: Replacing primary IP: ' + interfaces[currectInterface].ip + ' --> ';
                                } else {
                                    msg = 'Info: Setting primary IP: ';
                                }

                                interfaces[currectInterface].ip = clearIPAddress(currectIp, false);
                                return output(msg + interfaces[currectInterface].ip);
                            } else {
                                return output("Syntax error: Illegal parameter");
                            }
                        }
                    }
                    if (vall == 'enable') {
                        if ('ip' in interfaces[currectInterface] && interfaces[currectInterface].ip != "") {
                            interfaces[currectInterface].enable = 1;
                            // $('input.cmdline:last').val("");
                        } else {
                            // $('input.cmdline:last').val("");
                            output('you have to set ip address');
                        }
                        return;
                    }
                    if (vall == 'disable') {
                        if ('ip' in interfaces[currectInterface] && interfaces[currectInterface].ip != "") {
                            interfaces[currectInterface].enable = 0;
                            // $('input.cmdline:last').val("");
                        } else {
                            // $('input.cmdline:last').val("");
                            output('you have to set ip address');
                        }
                        return;
                    }
                    if (vall == 'exit') {
                        // $('input.cmdline:last').val("");
                        $('input.cmdline:last').removeClass("hiddenText");
                        currectInterface = "";
                        $('.prompt:last').html(hostname + '(config)#');
                        return;
                    }
                    if (vall.startsWith("do ping ")) {
                        // var ipToPing = vall.replace(/do ping /g, '');
                        var pingOptions = vall.replace(/do ping /g, '').split(' ');
                        var ipToPing =pingOptions[0];
                        var pingCount=5;
                        if(typeof pingOptions[1] !== "undefined"  ){
                            if( pingOptions[1]=='indefinite') {
                                pingCount='indefinite';
                            }else if(pingOptions[1]=='repeat' && typeof pingOptions[2] !== "undefined" && !isNaN(pingOptions[2])  ){
                                pingCount = pingOptions[2];
                            }else{
                                return output("Syntax error: Illegal parameter");
                            }
                        }
                        console.log(pingOptions);


                        // // check if enabled
                        if (!'enable' in interfaces[currectInterface] || interfaces[currectInterface].enable != 1) {
                            return doPING(ipToPing, false,pingCount);
                        }
                        if (!'ip' in interfaces[currectInterface] || interfaces[currectInterface].ip == "") {
                            return doPING(ipToPing, false,pingCount);
                        }

                        
                        if (ValidateIPaddress(ipToPing + '/24') == false) {
                            return output("You have entered an invalid IP address!");
                        }
                        ipToPing = clearIPAddress(ipToPing);
                        var sliptd = interfaces[currectInterface].ip.split('/');
                        if (sliptd[1] != MASK) {
                            return doPING(ipToPing, false,pingCount);
                        }

                        if (checkSettings(interfaces, MASK, portsIps, interfaceNames, currectInterface, ipToPing)) {
                            return doPING(ipToPing, true,pingCount);
                        }
                        //  check if one of interfaces is defualt
                        if (routeTable[0] != '' && typeof routeTable[0] !== "undefined") {
                            // || routeTable[0]==ipToPing

                            if (routeTable[0] == sliptd[0]) { //if this interface is default
                                if (ipToPing == sliptd[0]) { //if self ping
                                    return doPING(ipToPing, false,pingCount);
                                }
                                // get target interface
                                var rest = ipToPing.substring(0, ipToPing.lastIndexOf(".") + 1) + '1';
                                if (checkSettings(interfaces, MASK, portsIps, interfaceNames, interfaceNames[portsIps.indexOf(rest)], rest) != true) {
                                    return doPING(ipToPing, false,pingCount);
                                }
                                // if ! isset target
                                if (interfaces[interfaceNames[portsIps.indexOf(rest)]].ip != ipToPing + '/' + MASK && ipToPing != rest) {
                                    return doPING(ipToPing, false,pingCount);
                                }

                                return doPING(ipToPing, true,pingCount);
                            } else {
                                var rest = ipToPing.substring(0, ipToPing.lastIndexOf(".") + 1);
                                var last = ipToPing.substring(ipToPing.lastIndexOf(".") + 1, ipToPing.length);
                                var n = routeTable[0].startsWith(rest);
                                if (n == true) { ///if pinging defualt interface
                                    if (checkSettings(interfaces, MASK, portsIps, interfaceNames, interfaceNames[portsIps.indexOf(rest + '1')], rest + '1') != true) {
                                        return doPING(ipToPing, false,pingCount);
                                    }
                                    // if isset target
                                    if (last == '1') {
                                        return doPING(ipToPing, true,pingCount);
                                    }
                                    if (interfaces[interfaceNames[portsIps.indexOf(rest + '1')]].ip == ipToPing + '/' + MASK) {
                                        return doPING(ipToPing, true,pingCount);
                                    }
                                }
                            }
                        }
                        // check if routed togather 
                        var targ = ipToPing.substring(0, ipToPing.lastIndexOf(".") + 1) + '1';
                        var from = sliptd[0].substring(0, sliptd[0].lastIndexOf(".") + 1) + '1';
                        var last = ipToPing.substring(ipToPing.lastIndexOf(".") + 1, ipToPing.length);
                        if (routeTable.indexOf(from + ' - ' + targ) != -1 || routeTable.indexOf(targ + ' - ' + from) != -1) {
                            if (checkSettings(interfaces, MASK, portsIps, interfaceNames, interfaceNames[portsIps.indexOf(targ)], targ) != true) {
                                return doPING(ipToPing, false,pingCount);
                            }
                            if (last == '1') {
                                return doPING(ipToPing, true,pingCount);
                            }
                            if (interfaces[interfaceNames[portsIps.indexOf(targ)]].ip == ipToPing + '/' + MASK) {
                                return doPING(ipToPing, true,pingCount);
                            }
                        }
                        return doPING(ipToPing, false,pingCount);
                    }

                } else {

                    if (vall.startsWith("ip route ")) {
                        var targets = vall.replace(/ip route /g, '').split(' ');
                        if (targets.length != 2) {
                            return output(cmd + ': command not found');
                        }
                        if (targets[0] == 'default') {
                            if (ValidateIPaddress(targets[1] + '/24') == false) {
                                return output("You have entered an invalid IP address!");
                            }
                            if (portsIps.indexOf(clearIPAddress(targets[1])) != -1) {
                                return output("You have entered an invalid IP address!");
                            }
                            routeTable[0] = clearIPAddress(targets[1]);
                            return output(vall);
                        } else {
                            if (ValidateIPaddress(targets[1] + '/24') == false || ValidateIPaddress(targets[0] + '/24') == false) {
                                return output("You have entered an invalid IP address!");
                            }
                            targets[0] = clearIPAddress(targets[0]);
                            targets[1] = clearIPAddress(targets[1]);
                            if (portsIps.indexOf(targets[1]) == -1 || portsIps.indexOf(targets[0]) == -1) {
                                return output("You have entered an invalid IP address!");
                            }
                            if (targets[0] == targets[1]) {
                                return output("You have entered an invalid IP address!");
                            }
                            routeTable.push(targets[0] + ' - ' + targets[1]);
                            output(vall);
                        }

                    }
                    if (vall == 'do show') {
                        return output(doShowAll())

                    }
                    if (vall == 'do show ip route') {
                        output('Codes: K - kernel route, C - connected, S - static, R - RIP, ');
                        output('O - OSPF, I - IS-IS, B - BGP, A - Babel,> - selected route, * - FIB route ');
                        output('O - OSPF, I - IS-IS, B - BGP, A - Babel,> - selected route, * - FIB route ');
                        if (routeTable[0] != '' && typeof routeTable[0] !== "undefined") {
                            output('S>* 0.0.0.0/0 [1/0] via ' + routeTable[0] + ', ' + interfaceNames[portsIps.indexOf(routeTable[0])]);
                        }
                        portsIps.forEach(interFunction);

                        function interFunction(item, index) {
                            output('C>* ' + item + '/' + MASK + ' is directly connected,  ' + interfaceNames[portsIps.indexOf(item)]);
                        }
                        output('C>* 127.0.0.0/8 is directly connected, lo');
                        routeTable.forEach(conFunction);

                        function conFunction(item, index) {
                            if (index != 0) {
                                var sibilings = item.split(' - ');
                                output('S>* ' + sibilings[0] + '/' + MASK + ' [1/0] via ' + sibilings[1] + ',  ' + interfaceNames[portsIps.indexOf(sibilings[1])]);
                            }
                        }
                    }
                    
                }
                switch (cmd) {

                    case 'exit':
                        $('input.cmdline:last').val("");
                        $('input.cmdline:last').removeClass("hiddenText");
                        $('.prompt:last').html(hostname + '>');
                        configure = 0;
                        break;
                    case 'do show':
                        if (currectInterface != "") {
                            if (currectInterface in interfaces) {
                                if ('ip' in interfaces[currectInterface] && interfaces[currectInterface].ip != "") {
                                    output('ip address ' + interfaces[currectInterface].ip);
                                    if(interfaces[currectInterface].enable == 1){
                                        output('enable');
                                    }
                                    

                                }
                            }
                        }
                        break;
                    case 'do show enable':
                        if (currectInterface != "") {
                            if (currectInterface in interfaces) {
                                if ('ip' in interfaces[currectInterface] && interfaces[currectInterface].ip != "") {
                                    output('ip address ' + interfaces[currectInterface].ip);
                                }
                            }
                        }
                        break;
                    default:
                        output(cmd + ': command not found');
                }

                function doPING(target, result = true,pingCount = 5) {
                    // if(result!=true){
                    //   // $('input.cmdline:last').val("");
                    //   return output('network address unreachable ');
                    // }
                    $('#input-line').hide();
                    // $('input.cmdline:last').val("");
                    var seq = 0,
                        random, totalRandom = [];
                    output('PING ' + target + ' (' + target + '): 56 data bytes ');
                    var myVar = setInterval(timer, 500);

                    function timer() {
                        random = Math.floor(Math.random() * 12) + 8;
                        random = random + (Math.floor(Math.random() * 10) + 1) / 100;
                        totalRandom.push(random);
                        // output('PING '+target+' ('+target+'): 56 data bytes ');
                        if (result != true) {
                            output('From ' + target + ' icmp_seq=1 Destination Host Unreachable');
                        } else {
                            output('64 bytes from ' + target + ': seq=' + seq + ' ttl=64 time=' + random + ' ms');
                        }
                        $('#input-line').hide();
                        seq++;
                        goDown();
                       if(pingCount !='indefinite'){
                            if (seq == pingCount) {
                                myStopFunction();
                            }
                        }

                    }
                    ifC();

                    function ifC() {
                        var ctrlDown = false,
                            ctrlKey = 17,
                            cmdKey = 91,
                            cKey = 67,
                            ifRun = 405; //start and off this event
                        $(document).on('keydown', function(e) {
                            if (e.keyCode == ctrlKey || e.keyCode == cmdKey) ctrlDown = true;
                            if (ctrlDown && (e.keyCode == cKey)) {
                                if (ifRun == 405) {
                                    myStopFunction()
                                    ifRun = 202;
                                }
                            };
                        })
                    }

                    function myStopFunction() {
                        clearInterval(myVar);
                        var sum, avg = 0;
                        // dividing by 0 will return Infinity
                        // totalRandom must contain at least 1 element to use reduce
                        if (totalRandom.length) {
                            sum = totalRandom.reduce(function(a, b) {
                                return a + b;
                            });
                            avg = sum / totalRandom.length;
                        }

                        output(' --- ' + target + ' ping statistics --- ');
                        if (result != true) {
                            output(seq + ' packets transmitted, 0 packets received, ' + seq + ' errors , 100% packet loss  time 8015ms');
                        } else {
                            output(seq + ' packets transmitted, ' + seq + ' packets received, 0% packet loss round-trip min/avg/max = ' + Math.min.apply(Math, totalRandom) + '/' + avg + '/' + Math.max.apply(Math, totalRandom));
                        }

                        $('#input-line').show();

                        //   $(document).undelegate('keydown',function(e) {
                        //     if (e.keyCode == ctrlKey || e.keyCode == cmdKey) ctrlDown = true;
                        //     if (ctrlDown && ( e.keyCode == cKey)) {myStopFunction()};
                        // })
                    }
                }

            } else {

                if (adminSession == 2 && vall == 'configure terminal') {
                    configure = 1;
                    $('input.cmdline:last').val("");
                    $('.prompt:last').html(hostname + '(config)#');
                    $('input.cmdline:last').removeClass("hiddenText");
                    return;
                }
                switch (cmd) { ////if not config
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
                        output(new Date());
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
                        var result = "<img src=\"" + codehelper_ip["Flag"] + "\"><br><br>";
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
            output(startsInfo);
        },
        output: output
    }
    function output(html) {
        output_.insertAdjacentHTML('beforeEnd', '<p>' + html + '</p>');
    }
};