var basepath = getBaseURL();
var pageSize="10000";
var qtype="KvQuery";
var hbaseTable1="SJZ_DB_RELATION111";
var HBase="HBase01";
var ppstr="#??????????????????#??????????????#";
var wbxinxi="";
var counts=1;
var objlist=new Array();
var ispass=0;
var countwbdigui=0;
var ocxurl='http://10.25.1.150:8080/SJZDataCenter/personrelation/relation.jsp?pagename=index&sfzh=';
var countwb=0;
function searchInfo(types){ 
	countwb=0;
	var count=0;
	objlist=new Array();//��ʼ��
	if($("#idcard").val()==''||$("#idcard").val()==null)
		{ 
		alert("����֤������Ϊ�գ�");
		return false;
		}
	//alert(basepath + "/ProxRequest");
	var requestUHB=new Object();
	var parm=new Object();
	requestUHB.hbaseInstance=HBase;
	requestUHB.hbaseTable=hbaseTable1;
	requestUHB.qasType=qtype;
	requestUHB.params=new Object();
	//parm.fuzzyRowkey='130121199109142#??????????????????#??????????????#03';132629198006162012#130828200501171912#20141122143350#03
	requestUHB.params.rowkey="";
	requestUHB.params.isBatch='false';
	requestUHB.params.isFuzzy='true';
	requestUHB.params.pageSize=pageSize;
    requestUHB.params.returnType='rowkey';
	requestUHB.params.maxVersions='1';
	
	 
   // ͬ��  ͬ����  ͬ�� ͬס��  ͬ����
	$("#biaoqian1").html("ͬ��");//����count
	$("#biaoqian2").html("ͬ����");
	$("#biaoqian3").html("ͬ��");
	$("#biaoqian4").html("ͬס��");
	$("#biaoqian5").html("ͬ����");
	
	contentscount(requestUHB,'01');
	contentscount(requestUHB,'02');
	contentscount(requestUHB,'03');
	contentscount(requestUHB,'04');
	jisuanwbcount('05');
	requestUHB.params.fuzzyRow=$("#idcard").val()+ppstr+types;
	
	//requestUHB.params=parm;
	//alert(JSON.stringify(requestUHB));
 //StreamQASServlet
	//alert();
	$.ajax({
		type : "POST",
		url :basepath + "/ProxRequest",
		data :JSON.stringify(requestUHB),
		dataType : "json", 
		processData:false,
		jsonp:false,
		success : function(restext) {
			//alert(JSON.stringify(restext)); 
			var results=restext.result;
			var content="";
			
            var nextRowkey="";
			for(var o in restext.result)
            	{
            	 //alert(results[o]);
            	 var results1=results[o];
            	 for(var oo in results[o])
            	 {
            		 var results2=results1[oo];
            		 for(var ooo in results2)
            		 { 
                        content="";

            			 if(types=='01')
            			 {    
            				 if(results2[ooo].ID2.length==18){ 
            					 if(results2[ooo].ID2==$("#idcard").val()){
            						 content+="<tr style='color:red'>"; 
            						 // alert();
            					 }else{   
            						 //content+="<tr>";
            						 content+="<tr >"; }
            					 //������֤���ţ��Ա𣬰������ƣ�����ʱ�䣬��������
            					 content+="<td>"+results2[ooo].XM2+"</td>";
            					 content+="<td>"+results2[ooo].ID2+"</td>";

            					 content+="<td>"+results2[ooo].XB2+"</td>";
            					 content+="<td>"+results2[ooo].CSMC+"</td>";
            					 content+="<td>"+results2[ooo].TIME+"</td>";


            					 content+="<td><div class='btn-group'> <button class='btn  btn-xs btn-default' onclick='desp(\"��������\",\""+results2[ooo].DESP+"\")'>��������</button></div></td>";
            					 content+="</tr>";
            				 } 


            			 }
            			 else if(types=='02'){
            				 //������֤���ţ��Ա𣬼������ƣ�ͬ��ʱ�䣬����ԭ��
            				 if(results2[ooo].ID2.length==18){ 
            					 if(results2[ooo].ID2==$("#idcard").val()){
            						 content+="<tr style='color:red'>"; 
            						 // alert();
            					 }else{
            						 //content+="<tr>";
            						 content+="<tr >"; }
            					 content+="<td>"+results2[ooo].XM2+"</td>";
            					 content+="<td>"+results2[ooo].ID2+"</td>";

            					 content+="<td>"+results2[ooo].XB2+"</td>";
            					 content+="<td>"+results2[ooo].CSMC+"</td>";
            					 content+="<td>"+results2[ooo].TIME+"</td>";

            					 content+="<td><div class='btn-group'> <button class='btn  btn-xs btn-default' onclick='desp(\"����ԭ��\",\""+results2[ooo].DESP+"\")'>����ԭ��</button></div></td>";
            					 content+="</tr>";
            				 }
            			 }
            			 else if(types=='03'){
            				 if(results2[ooo].ID2.length==18){ 
            					 if(results2[ooo].ID2==$("#idcard").val()){
            						 content+="<tr style='color:red'>"; 
            						 // alert();
            					 }else{//������֤���ţ��Ա𣬹�ϵ����
            						 //content+="<tr>";
            						 content+="<tr >"; }
            					 content+="<td>"+results2[ooo].XM2+"</td>";
            					 content+="<td>"+results2[ooo].ID2+"</td>";

            					 content+="<td>"+results2[ooo].XB2+"</td>";

            					 content+="<td><div class='btn-group'> <button class='btn  btn-xs btn-default' onclick='desp(\"��ϵ����\",\""+results2[ooo].DESP+"\")'>��ϵ����</button></div></td>";
            					 content+="</tr>";
            				 }
            			 }
            			 else if(types=='04'){//������֤���ţ��Ա�ͬסʱ�䣬ס�����ƣ�ͬס����
            				 if(results2[ooo].ID2.length==18){ 
            					 if(results2[ooo].ID2==$("#idcard").val()){
            						 content+="<tr style='color:red'>"; 
            						 // alert();
            					 }else{
            						 //content+="<tr>";
            						 content+="<tr >"; }
            					 content+="<td>"+results2[ooo].XM2+"</td>";
            					 content+="<td>"+results2[ooo].ID2+"</td>";

            					 content+="<td>"+results2[ooo].XB2+"</td>";
            					 content+="<td>"+results2[ooo].TIME+"</td>";
            					 content+="<td>"+results2[ooo].CSMC+"</td>";
            					 content+="<td><div class='btn-group'> <button class='btn  btn-xs btn-default' onclick='desp(\"ͬס����\",\""+results2[ooo].DESP+"\")'>ͬס����</button></div></td>";
            					 content+="</tr>";
            				 }
            			 }
            			 
            			 objlist[count]=content;
            			 count++;
            			 //alert(count);
            		 }
            	 }
            	 break;
            	}
			
			//alert(count);
			  $.extend(param, {page : 1});
			  pagecontent(types);
		} 
	});
	
	//doData(types);
	
}

function jisuanwbcount(types){
	countwb=0;
	var requestUHB=new Object();
	var parm=new Object();
	requestUHB.hbaseInstance=HBase;
	requestUHB.hbaseTable="SJZ_WB_RELATION";
	requestUHB.qasType=qtype;
	requestUHB.params=new Object();
	
	requestUHB.params.rowkey="";
	requestUHB.params.isBatch='false';
	requestUHB.params.isFuzzy='true';
	requestUHB.params.pageSize=pageSize;
    requestUHB.params.returnType='rowkey';
	requestUHB.params.maxVersions='1';
	 var ppstrs1=ppstr+'000000#';
     requestUHB.params.fuzzyRow=$("#idcard").val()+ppstrs1+types;
     contentscount01(requestUHB,types);//00
    //01
      var ppstrs2=ppstr+'000001#';
      requestUHB.params.fuzzyRow=$("#idcard").val()+ppstrs2+types;
      contentscount01(requestUHB,types);
     // alert(content+"---------------------------");
    //02
      var ppstrs3=ppstr+'000002#';
      requestUHB.params.fuzzyRow=$("#idcard").val()+ppstrs3+types;
      contentscount01(requestUHB,types);
    //03
      var ppstrs4=ppstr+'000003#';
      requestUHB.params.fuzzyRow=$("#idcard").val()+ppstrs4+types;
      contentscount01(requestUHB,types);
    //04
      var ppstrs5=ppstr+'000004#';
      requestUHB.params.fuzzyRow=$("#idcard").val()+ppstrs5+types;
      contentscount01(requestUHB,types);
    //05
      var ppstrs6=ppstr+'000005#';
      requestUHB.params.fuzzyRow=$("#idcard").val()+ppstrs6+types;
      //alert($("#idcard").val()+ppstrs6+types);
      contentscount01(requestUHB,types);
     // alert("---");
	
	
	
}

function guanxi(){
	if($("#idcard").val()==''||$("#idcard").val()==null)
	{ 
	alert("����֤������Ϊ�գ�");
	return false;
	}
	//window.open(ocxurl+$("#idcard").val()).moveTo(0, 0).resizeTo(1000,800);
    // $("#idcard").val();	
	window.open(ocxurl+$("#idcard").val(),'��ϵͼչʾ','width='+(window.screen.availWidth-10)+',height='+(window.screen.availHeight-30)+',top=0,left=0,resizable=yes,status=yes,menubar=no,scrollbars=yes');
	
}

function doData(types){
	
	 
	
	
}
function searchWBInfotest(types){
	
	var requestUHB=new Object();
	var parm=new Object(); 
	requestUHB.hbaseInstance=HBase;
	requestUHB.hbaseTable="SJZ_WB_RELATION";
	requestUHB.qasType=qtype;
	requestUHB.params=new Object();
	
	requestUHB.params.rowkey="";
	requestUHB.params.isBatch='false';
	requestUHB.params.isFuzzy='true';
	requestUHB.params.pageSize=pageSize;
    requestUHB.params.returnType='rowkey';
	requestUHB.params.maxVersions='1';
	requestUHB.count="5";
	 var ppstrs1=ppstr+'000000#';
	requestUHB.params.fuzzyRow='110102197111053056'+ppstrs1+types;
	
	
	$.ajax({
		type : "POST",
		url :basepath + "/ProxWBRequest",
		data :JSON.stringify(requestUHB),
		dataType : "json", 
		processData:false,
		jsonp:false,
		success : function(restext) {
			 
			  
		} 
	});
	
	
	
	
}
function searchWBInfo(types){
	 objlist=new Array();//��ʼ��
    ispass=0;
	counts=0;
	countwb=0;
	if($("#idcard").val()==''||$("#idcard").val()==null)
		{ 
		alert("����֤������Ϊ�գ�");
		return false;
		}
	//alert(basepath + "/ProxRequest");
	var requestUHB=new Object();
	var parm=new Object();
	requestUHB.hbaseInstance=HBase;
	requestUHB.hbaseTable="SJZ_WB_RELATION";
	requestUHB.qasType=qtype;
	requestUHB.params=new Object();
	
	requestUHB.params.rowkey="";
	requestUHB.params.isBatch='false';
	requestUHB.params.isFuzzy='true';
	requestUHB.params.pageSize=pageSize;
    requestUHB.params.returnType='rowkey';
	requestUHB.params.maxVersions='1';
	$("#biaoqian1").html("ͬ��");//����count
	$("#biaoqian2").html("ͬ����");
	$("#biaoqian3").html("ͬ��");
	$("#biaoqian4").html("ͬס��");
	$("#biaoqian5").html("ͬ����");
	
	contentscount(requestUHB,'01');
	contentscount(requestUHB,'02');
	contentscount(requestUHB,'03');
	contentscount(requestUHB,'04');
	jisuanwbcount('05');
     var ppstrs1=ppstr+'000000#';
     requestUHB.params.fuzzyRow=$("#idcard").val()+ppstrs1+types;
        contents(requestUHB,types);//00
    //01
      var ppstrs2=ppstr+'000001#';
      requestUHB.params.fuzzyRow=$("#idcard").val()+ppstrs2+types;
      contents(requestUHB,types);
     // alert(content+"---------------------------");
    //02
      var ppstrs3=ppstr+'000002#';
      requestUHB.params.fuzzyRow=$("#idcard").val()+ppstrs3+types;
       contents(requestUHB,types);
    //03
      var ppstrs4=ppstr+'000003#';
      requestUHB.params.fuzzyRow=$("#idcard").val()+ppstrs4+types;
      contents(requestUHB,types);
    //04
      var ppstrs5=ppstr+'000004#';
      requestUHB.params.fuzzyRow=$("#idcard").val()+ppstrs5+types;
      contents(requestUHB,types);
    //05
      var ppstrs6=ppstr+'000005#';
      requestUHB.params.fuzzyRow=$("#idcard").val()+ppstrs6+types;
      contents(requestUHB,types);
      $.extend(param, {page : 1});
      //alert(counts);
	 
 
}

function contentscount01(requestOb,types){
	//requestOb.params.fuzzyRow=$("#idcard").val()+ppstr+types;
	//alert(countx);  
	var content="";
	$.ajax({
		type : "POST",
		url :basepath + "/ProxRequest",
		data :JSON.stringify(requestOb),
		dataType : "json", 
		processData:false,
		jsonp:false,
		success : function(restext) {
			var countx=0;
			//alert(JSON.stringify(restext)); 
			var results=restext.result;
            var nextRowkey="";
            for(var o in restext.result)
        	{
        	 //alert(results[o]);
        	 var results1=results[o];
        	 for(var oo in results[o])
        		 {
        		 var results2=results1[oo];
        		 for(var ooo in results2)
        			 { 
        		      content="";
      				 if(results2[ooo].ID2.length==18){ 
        				  
        				  //������֤���ţ��Ա�����ʱ�䣬��������
        					//countx++;
          					countwb++;
          					// alert(countwb);
        			 }
        			 }
        		 }
        	 break;
        	}
			
			 if(countwb>0)
		    	{
		    	//alert(countx);
		    	  if(types=='05'){
		    		  $("#biaoqian5").html("ͬ����<span id='biaoqian1' class='label label-warning'>"+countwb+"</span>");

				}
		    	}
			 
			   
		} 
	});
	
	
}





function contentscount(requestOb,types){
	requestOb.params.fuzzyRow=$("#idcard").val()+ppstr+types;
	//alert(countx);  
	var content="";
	$.ajax({
		type : "POST",
		url :basepath + "/ProxRequest",
		data :JSON.stringify(requestOb),
		dataType : "json", 
		processData:false,
		jsonp:false,
		success : function(restext) {
			var countx=0;
			//alert(JSON.stringify(restext)); 
			var results=restext.result;
            var nextRowkey="";
            for(var o in restext.result)
        	{
        	 //alert(results[o]);
        	 var results1=results[o];
        	 for(var oo in results[o])
        		 {
        		 var results2=results1[oo];
        		 for(var ooo in results2)
        			 { 
        		      content="";
      				 if(results2[ooo].ID2.length==18){ 
        				  
        				  //������֤���ţ��Ա�����ʱ�䣬��������
        					countx++;
          					//countwb++;
          					// alert(countwb);
        			 }
        			 }
        		 }
        	 break;
        	}
			
			 if(countx>0)
		    	{
		    	//alert(countx);
		    	if(types=='01')
				{    
					$("#biaoqian1").html("ͬ��<span id='biaoqian1' class='label label-warning'>"+countx+"</span>");
					//
				}
				else if(types=='02'){
					$("#biaoqian2").html("ͬ����<span id='biaoqian1' class='label label-warning'>"+countx+"</span>");
				}
				else if(types=='03'){
					$("#biaoqian3").html("ͬ��<span id='biaoqian1' class='label label-warning'>"+countx+"</span>");
				}
				else if(types=='04'){
					$("#biaoqian4").html("ͬס��<span id='biaoqian1' class='label label-warning'>"+countx+"</span>");
				}  // ͬ��  ͬ����  ͬ�� ͬס��  ͬ����
		    	}
			 
			   
		} 
	});
	
	
}
function contents(requestOb,types){
	  
	var content="";
	$.ajax({
		type : "POST",
		url :basepath + "/ProxRequest",
		data :JSON.stringify(requestOb),
		dataType : "json", 
		processData:false,
		jsonp:false,
		success : function(restext) {
			//alert(JSON.stringify(restext)); 
			var results=restext.result;
            var nextRowkey="";
			for(var o in restext.result)
            	{
            	 //alert(results[o]);
            	 var results1=results[o];
            	 for(var oo in results[o])
            		 {
            		 var results2=results1[oo];
            		 for(var ooo in results2)
            			 { 
            		      content="";
          				 if(results2[ooo].ID2.length==18){ 
            				 if(results2[ooo].ID2==$("#idcard").val()){
            					 content+="<tr style='color:red'>"; 
            					// alert();
            				 }else{
            					 //content+="<tr>";
            					 content+="<tr >"; }
            				  //������֤���ţ��Ա�����ʱ�䣬��������
            				 content+="<td>"+results2[ooo].XM2+"</td>";
            			    content+="<td>"+results2[ooo].ID2+"</td>";
            			// content+="<td>"+results2[ooo].XB2+"</td>";
            			 content+="<td>"+results2[ooo].TIME+"</td>";
            			 content+="<td><div class='btn-group'> <button class='btn  btn-xs btn-default' onclick='desp(\"��������\",\""+results2[ooo].DESP+"\")'>��������</button></div></td>";
            			 content+="</tr>";
            			 objlist[counts]=content;//��ʼ��
            			 counts++;
            			 }
            			 }
            		 }
            	 break;
            	}
			 ispass++;
		     if(ispass==6)
		    	 {
		    	// alert("-----");
		    	 pagecontent(types);
		    	 }
			  
		} 
	});
	
	
}



function del(){
	
	var requestUHB=new Object();
	var parm=new Object();
	requestUHB.hbaseInstance=HBase;
	requestUHB.hbaseTableName='YW_CZRK_ZP';
	requestUHB.delType="rows";
	requestUHB.params=new Object();
	//parm.fuzzyRowkey='130121199109142#??????????????????#??????????????#03';132629198006162012#130828200501171912#20141122143350#03
	 requestUHB.params.fuzzyRow="";
	//requestUHB.params.startRow="013012564050479317";
	//requestUHB.params.stopRow="013012564050479317";
	$.ajax({
		type : "POST",
		url :basepath + "/DelProxRequest",
		data :JSON.stringify(requestUHB),
		dataType : "json", 
		processData:false,
		jsonp:false,
		success : function(restext) {
            //alert(constent);
			
		} 
	});
	
	
	
}
function desp(desp,filed){
	
	        $("#myModal5").modal('show');
	        $("#myModalLabel5").text(desp);
	        $("#desp").html(filed);
	
	
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       