var tconfig={
    "yangdunzhonggong":2,
    "yuanstyle":"average",
    "apptitle":"奇门遁甲",
}
var t={
    "":"",
    "gan":
        "甲 乙 丙 丁 戊 己 庚 辛 壬 癸".split(" "),
    "zhi":
        "子 丑 寅 卯 辰 巳 午 未 申 酉 戌 亥".split(" "),
    "jieqibyyinyang":
        "冬至 小寒 大寒 立春 雨水 惊蛰 春分 清明 谷雨 立夏 小满 芒种 夏至 小暑 大暑 立秋 处暑 白露 秋分 寒露 霜降 立冬 小雪 大雪".split(" "),
    "jieqibyyear":
        "小寒 大寒 立春 雨水 惊蛰 春分 清明 谷雨 立夏 小满 芒种 夏至 小暑 大暑 立秋 处暑 白露 秋分 寒露 霜降 立冬 小雪 大雪 冬至".split(" "),
    "liusan":
        "戊 己 庚 辛 壬 癸 丁 丙 乙".split(" "),
    "xunshou":
        "子 戌 申 午 辰 寅".split(" "),
    "zhibyjieqi":
        "丑 寅 卯 辰 巳 午 未 申 酉 戌 亥 子".split(" "),
    "baguabyyinyang":
        "坎 艮 震 巽 离 坤 兑 乾".split(" "),
    "baguabyhoutian":
        "坎 坤 震 巽 乾 兑 艮 离".split(" "),
    "baguabyG":
        "坎 坤 震 巽 中 乾 兑 艮 离".split(" "),
    "xingbyG":
        "蓬 芮 冲 辅 禽 心 柱 任 英".split(" "),
    "menbyG":
        "休 死 伤 杜 死 开 惊 生 景".split(" "),
    "zhibyG":
        "子 未申 卯 辰巳 _ 戌亥 酉 丑寅 午".split(" "),
    "menbyB":
        "休 生 伤 杜 景 死 惊 开".split(" "),
    "five":
        "木 火 土 金 水".split(" "),
    "star":
        "蓬 芮 冲 辅 禽 心 柱 任 英".split(" "),
    "termyearlen":
        365.24219878,
    "terminfo":
        [0,1272494.4, 2548020.6, 3830143.8, 5120226.6, 6420865.8, 7732018.8, 9055272.6, 10388958, 11733065.4, 13084292.4, 14441592, 15800560.8, 17159347.2, 18513766.2, 19862002.2, 21201005.4, 22529659.8, 23846845.2, 25152606, 26447687.4, 27733451.4, 29011921.2, 30285477.6],
    "ordplate":
        [3,8,1,6,5,0,7,2],
    "ordreal":
        [3,8,1,2,4,6,7,0,5],
    "ordreal2":
        [7,0,5,2,4,6,3,8,1],
}
function jieqivalue(yr,no){
    //从0开始，第一个节气是小寒
    var val,basedx;
    basedx=Date.parse("2016/01/06 06:08:21")+t.termyearlen*24*60*60*1000*(yr-2016);
    val=new Date();
    val.setTime(basedx+t.terminfo[no]*1000);
    return val;
}
function jieqi(dx){
    var y,m,d,d1,d2,r,r2,y2;
    y=dx.getFullYear();
    m=dx.getMonth();
    d=dx.getDate();
    d1=jieqivalue(y,m*2);
    d2=jieqivalue(y,m*2+1);
    if (dx<d1) 
        r=m*2-1
    else if(dx<d2)
        r=m*2
    else
        r=m*2+1
    if (r<0) {r=r+24;y=y-1;}
    r2=(r+1)%24;
    y2=y;
    if (r+1>23){y2=y2+1;}
    past=(dx-jieqivalue(y,r))/1000/3600/24;
    past=past.toFixed(2);
    percentage=(dx-jieqivalue(y,r))/(jieqivalue(y2,r2)-jieqivalue(y,r));
    return {"name":t.jieqibyyear[r],"past":past,"percentage":percentage};
}
function nianzhu(dx){
    var y,a,b,c;
    y=dx.getFullYear();
    a=y%10;
    a=a-3;
    if (a<=0) a=a+10;
    b=y%100;
    if (y>=1800 && y<=1899) 
        b=b+9
    else if (y<=1999)
        b=b+1
    else if (y<=2099)
        b=b+5
    b=b%12;
    if (b==0) b=12;
    return t.gan[a-1] + t.zhi[b-1];
}
function yuezhu(dx){
    var xs,a,b,c;
    xs=Array(2,4,6,8,0);
    b=Math.floor(t.jieqibyyear.indexOf(jieqi(dx).name)/2);
    c=t.gan.indexOf(nianzhu(dx).substr(0,1));
    a=xs[c%5]+b-1;
    a=a%10;
    return t.gan[a] + t.zhibyjieqi[b];
}
function rizhu(dx){
    var y,m,d,s,s2,r,u,x;
    var a,b;
    y=dx.getFullYear();
    s=Number(String(y).substr(-2))-1;
    s2=Math.floor(s/4);
    u=s%4;
    m=Number(Array(0,31,-1,30,0,31,1,32,3,33,4,34)[dx.getMonth()+1-1]);
    d=dx.getDate();
    x=Number(Array(3,47,31,15,0,44,28,12,57,41)[Math.floor((y-1)/100-16)]);
    r=s2*6+5*(s2*3+u)+m+d+x;
    if (((y%4==0 && y%100!=0) || (y%400==0)) && (dx.getMonth()+1>2)) r=r+1;
    r=r%60;
    a=r%10;
    b=r%12;
    if (a==0) a=10;
    if (b==0) b=12;
    return t.gan[a-1] + t.zhi[b-1];
}
function shizhu(dx){
    var z,g;
    z=Math.floor(((dx.getHours()+1) % 24)/2)+1;
    g=(t.gan.indexOf(rizhu(dx).substr(0,1))+1)*2+z-2;
    g=g%10;
    if (g<=0) g=g+10;
    //console.log(g); 
    return t.gan[g-1] + t.zhi[z-1];
}
function sanyuan(dx,style){
    var yuan,k;
    var gi,zi;
    style=style || "average";
    //茅山起局
    if (style=="maoshan"){
        yuan=Math.floor(jieqi(dx).past/5);
    }
    //平均分法
    else if (style=="average"){
        //console.log(jieqi(dx).percentage);
        k=jieqi(dx).percentage;
        if (k<1/3) 
            yuan=0
        else if (k<2/3)
            yuan=1
        else
            yuan=2
    }
    //根据日干计算
    else{}

    return yuan;
}
function yinyangju(dx){
    var k,a,b,c,d,yy;
    //获取节气对应的阴阳变化顺序，0~3阳，4~7阴
    k=t.jieqibyyinyang.indexOf(jieqi(dx).name);
    a=Math.floor(k/3);
    b=k%3;
    //console.log(a,b);
    yy=(a<4)?1:-1;
    //获得节气对应八卦在九宫中的序号
    k=t.baguabyG.indexOf(t.baguabyyinyang[a]);
    //八卦中第一个节气上元局数为k+1
    c=k+1;
    //根据同一卦中节气的顺序变化
    c=b*yy+c;
    //上中下元
    c=c+sanyuan(dx)*6*yy;
    //归一化
    c=yy*((c+9*9)%9);
    return c;
}

//计算九宫内的元素
function setElements(dx){
    var ju=yinyangju(dx);
    var dgan=(ju>0)?"012345678":"087654321";
    var tgan="38165072";
    var k,xunshou,xid,xpos,mid,mpos,spos
    var osx,jux,c,temp,temp2,dbg,xpos0,mpos0,spos0;
    dbg="";
    //0~8宫对应的六三序号，地盘干
    jux=Math.abs(ju)-1;
    dgan=dgan.substr(-jux) + dgan.substr(0,9-jux); //if (k!=0)
    //根据时柱，计算天盘旬首：戊己庚辛壬癸0~5
    var vidx=[0,-10,-8,-6,-4,-2];
    ab=shizhu(dx);
    k=t.gan.indexOf(ab.substr(0,1))-t.zhi.indexOf(ab.substr(1,1));
    if (k>0) k=k-12;
    //console.log("k",k);
    k=vidx.indexOf(k);
    xunshou=k;
    //xid：旬首宫位，也是星（值符）的id
    //mid：门（值使）的序号，首先根据xid确定宫对应的门，需要再转换成八个里面的顺序
    xid=dgan.indexOf(xunshou);
    //if (xid==4) xid=(ju>0)?tconfig.yangdunzhonggong:2;
    mid=t.menbyB.indexOf(t.menbyG[xid]);
    //xpos：星（值符）位置即时干所在宫
    //因为现在时间的天干有10种，宫只有9个，所以如果时干为甲，那么转换成旬首对应的六仪所在宫
    k=t.liusan.indexOf(ab.substr(0,1));
    k=(k<0)?xunshou:k;
    xpos=dgan.indexOf(k);
    xpos0=xpos;
    //mpos：门（值使）位置，根据 时支 与 旬首地支的差值，从 旬首宫位 开始，顺推门盘宫位
    k=t.zhi.indexOf(ab.substr(1,1))-t.zhi.indexOf(t.xunshou[xunshou]);
    if (k<0) k=k+12;
    k=(ju>0)?(xid+k):(xid-k);
    k=(k+18)%9
    mpos=k;
    //spos：八神位置
    if (mpos==4) mpos=(ju>0)?tconfig.yangdunzhonggong:2;
    if (xpos==4) xpos=(ju>0)?tconfig.yangdunzhonggong:2;
    spos=xpos;
    //天盘干：根据地盘干，进行旋转 时干所在宫位-旬首对应地盘
    temp2=dgan.indexOf(t.gan.indexOf(ab.substr(0,1)));
    c=t.ordplate.indexOf(temp2)-t.ordplate.indexOf(xid);
    console.log("temp:",temp2,t.ordplate.indexOf(temp2)," ; ","xid",xid,t.ordplate.indexOf(xid),"xpos:",xpos)
    c=(c-1+8)%8;
    tgan="";
    for (var i=0;i<t.ordplate.length;i++){
        tgan=tgan + dgan[t.ordplate[i]];
    }
    tgan=tgan.substr(-(8-c)) + tgan.substr(0,c)
    temp=tgan;
    tgan="";
    for (var i=0;i<9;i++){
        temp2=i;
        if (i==4) 
            tgan=tgan + "9"
        else
            tgan=tgan + temp[t.ordplate.indexOf(temp2)]
    }
    console.log("tgan",tgan);
    console.log(t.xingbyG[xid]+ "(" + t.baguabyG[xpos] + ") " + t.menbyB[mid] + "(" + t.baguabyG[mpos] + ")" + tgan);
    
    //输出布局
    osx="<h1>"+tconfig.apptitle+"</h1>";
    osx=osx+"<br />" + "时间&nbsp;&nbsp;"+dx.toString();
    osx=osx+"<br />" + "节气&nbsp;&nbsp;"+"阴阳"[(Math.abs(ju)+ju)/ju/2]+"遁&nbsp;&nbsp;" + "零一二三四五六七八九"[Math.abs(ju)]+"局&nbsp;&nbsp;"+jieqi(dx).name+"&nbsp;&nbsp;"+"上中下"[sanyuan(dx)]+"元("+jieqi(dx).past+"天) ";
    osx=osx+"<br />" +"四柱&nbsp;&nbsp;"+nianzhu(dx)+"&nbsp;&nbsp;"+yuezhu(dx)+"&nbsp;&nbsp;"+rizhu(dx)+"&nbsp;&nbsp;"+shizhu(dx);
    osx=osx+"<br /><br />"
    for (var i=0;i<3;i++){
        for (var j=0;j<3;j++){
            //k为顺序数字
            k=j+i*3;
            //转换成宫格数字
            k=t.ordreal[k];
            //osx=osx + k + ".";
            osx=osx + t.baguabyG[k];
            osx=osx + t.liusan[dgan[k]];
            temp2=tgan[k];
            //if (temp2==4) temp2=(ju>0)?tconfig.yangdunzhonggong:2;
            //osx=osx + t.liusan[temp2];
            //osx=osx + t.liusan[tgan[t.ordplate.indexOf(k)]];
            //osx=osx + t.liusan[temp[t.ordplate.indexOf(k)]];
            console.log(k,temp2,t.liusan[temp2]);
            osx=osx + "&nbsp;&nbsp;&nbsp;&nbsp;";
        }
        osx=osx + "<br />";
    }
    osx=osx + "<hr />";
    dbg=dbg+"<br />"+ "地盘干 -> "+dgan;
    dbg=dbg+"<br />"+ "旬首"+xunshou+"(+1) -> 甲"+t.xunshou[xunshou]+t.liusan[xunshou]+" -> "+t.liusan[xunshou]+"在"+dgan.indexOf(xunshou)+"(+1)宫 -> "+t.baguabyG[dgan.indexOf(xunshou)]+"宫 -> xid:"+xid+" -> "+t.xingbyG[xid]+"星(值符);"+t.menbyG[xid]+"门(值使)";
    dbg=dbg+"<br />"+ "时干为"+ab.substr(0,1)+" -> 在地盘中寻找 -> 位于"+t.baguabyG[xpos]+"宫 -> 确定了"+t.xingbyG[xid]+"星的位置";
    temp2=(t.zhi.indexOf(ab.substr(1,1))-t.zhi.indexOf(t.xunshou[xunshou])+12)%12;
    dbg=dbg+"<br />"+ "旬首地支为甲"+t.xunshou[xunshou]+ "的"+t.xunshou[xunshou]+ " -> 往后推"+temp2+"个元素 -> " + "为"+ab.substr(1,1)+"的时支 -> "+"阴阳"[(Math.abs(ju)+ju)/ju/2]+"遁就"+"逆顺"[(Math.abs(ju)+ju)/ju/2]+"着值符位置"+t.baguabyG[xpos]+"宫推"+temp2+"个元素 -> "+t.baguabyG[mpos]+"宫即为"+t.menbyG[xid]+"门(值使)位置";
    dbg=dbg+"<br />"+ t.xingbyG[xid]+ "(" + t.baguabyG[xpos] + ") " + t.menbyB[mid] + "(" + t.baguabyG[mpos] + ")" + tgan
    osx=osx + dbg;
    return osx;
}
function drawlayer(){
    var osx="";
    osx="";
} 
