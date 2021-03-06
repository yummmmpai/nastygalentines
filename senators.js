var SenateActionWidget, bind=function(fn,me){
    return function(){
    return fn.apply(me,arguments)}
};
    
SenateActionWidget=function(){
    function SenateActionWidget(){
        this.getJQuery=bind(this.getJQuery,this),
        this.updateSenators=bind(this.updateSenators,this),
        this.parseResponse=bind(this.parseResponse,this),
        this.fetchSenators=bind(this.fetchSenators,this),
        this.zipPress=bind(this.zipPress,this),
        this.ready=bind(this.ready,this),
        this.submit=bind(this.submit, this),
        this.init=bind(this.init,this),
        this.fetchInProgress=!1,
        window.jQuery?this.init():this.getJQuery()
    }
    
    return  SenateActionWidget.prototype.init=function(){
                                                return $(document).ready(this.ready)
                                            },
        
            SenateActionWidget.prototype.ready=function(){
                return  this.base=$("#senate-action-widget-div"),
                    this.infoDiv=this.base.find(".senator-info"),
                    this.submit=this.base.find("#submit"),
                    this.zipInput=this.base.find("input.zip"),
                    this.submit.on("click",this.zipPress)
            },
                    
            SenateActionWidget.prototype.zipPress=function(e){
                var zip;
             
                if(zip=this.zipInput.val(),5===zip.length)
                    return zip.match(/[0-9]{5}/)?this.fetchSenators(zip):void 0
            },                  

            SenateActionWidget.prototype.fetchSenators=function(zip){
                if(!this.fetchInProgress)
                    return this.fetchInProgress=!0,
                    console.log("fetching"),
                    $.getJSON("https://3eimjs1n02.execute-api.us-west-1.amazonaws.com/prod/sunlight",
                    {zip:zip},
                    this.parseResponse)
            },
                                
            SenateActionWidget.prototype.parseResponse=function(resp){
                var i,len,o,ref,results;
                for(this.fetchInProgress=!1,this.infoDiv.empty().removeClass("hide"),ref=resp.results,results=[],i=0,len=ref.length;i<len;i++)
                    o=ref[i],
                    "senate"===o.chamber&&results.push(this.updateSenators(o));
                    return results
            },
                                    
            SenateActionWidget.prototype.updateSenators=function(o){
                var p,t;
                return t=o.twitter_id?'<a href="https://twitter.com/'+o.twitter_id+'" target="_blank">@'+o.twitter_id+"</a><br/>":"",p=o.phone?o.phone+"<br/>":"",this.infoDiv.append('<div class="col sqs-col-6 span-6 panel"><h3>'+o.first_name+" "+o.last_name+"</h3><p>"+o.office+" <br>Washington DC 20510<br>"+t+p+"<p></div>")
            },
                                        
            SenateActionWidget.prototype.getJQuery=function(){
                var r,s,t;
                return  r=!1,s=document.createElement("script"),
                        s.type="text/javascript",
                        s.src="https://code.jquery.com/jquery-2.2.4.min.js",
                        s.onload=s.onreadystatechange=function(_this){
                                                        return function(){
                                                            if(!(r||_this.readyState&&"complete"!==_this.readyState))
                                                                return r=!0,_this.init()
                                                            }
                        }(this),
                    
                t=document.getElementsByTagName("script")[0],
                t.parentNode.insertBefore(s,t)
            },

    SenateActionWidget}(),
    window.s=new SenateActionWidget;
                            