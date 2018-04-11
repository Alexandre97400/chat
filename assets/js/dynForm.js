dynForm = {
	
	//TODO 
	/*
	totest : set prefix to a channel 
	totest : add a new channel as an element 
	totest : check member joining 
	totest : how does a member join a private chat ? 
	totest : add external chat
	?? : when adding a new channel , add all memebers ?
	change le slug ???
	check existance 
	create private rooms with role access
	quel politique d'affichage des chats public 
	*/

    jsonSchema : {
	    title : tradDynForm.addNewChannel,
	    icon : "comments",
	    onLoads : {
	    	onload : function(data){
	    		dyFInputs.setHeader("bg-azure");
				$("#btn-submit-form,.titletext, .urltext, .publiccheckboxSimple, .publicBtntagList,.publicInfocustom").hide();
				$("#ajaxFormModal #title, #ajaxFormModal #url").blur(function() { dyFObj.elementObj.dynForm.jsonSchema.canSubmitIf(); });
				
				if(contextData != null && contextData.type && contextData.id){
					dyFInputs.setSub("bg-azure");
					if( contextData.slug )
						$("#ajaxFormModal #parentSlug").val(contextData.slug);
				}
	    	}
	    },
	    save : function () { 
	    	if( $("#ajaxFormModal #choice").val() == "external" ){
	    		rcObj.loadChat( $("#ajaxFormModal #title").val() ,$("#ajaxFormModal #parentType").val(),"external",false,contextData, $("#ajaxFormModal #url").val() );
	    	}
	    	else 
	    	{
	    		isOpen = ( $("#ajaxFormModal #public").val() == "public" ) ? true : false;
	    		channelName = $("#ajaxFormModal #parentSlug").val()+"_"+slugify($("#ajaxFormModal #title").val());
	    		rcObj.loadChat( channelName,$("#ajaxFormModal #parentType").val(),isOpen,false,null );
	    	}
	    	dyFObj.closeForm();
	    },
	    canSubmitIf : function () { 
	    	 if ( $("#ajaxFormModal #choice").val() == "internal" && $("#ajaxFormModal #title").val() != "" )  
	    	 	 $("#btn-submit-form").show();
	    	 else if ( $("#ajaxFormModal #choice").val() == "external" && $("#ajaxFormModal #title").val() != "" && $("#ajaxFormModal #url").val() != ""  )	 
	    	 	$("#btn-submit-form").show();
	    	 else 
	    	 	$("#btn-submit-form").hide(); 
	    },
	    afterSave : function(){
			dyFObj.closeForm();
		    urlCtrl.loadByHash( location.hash );
	    },
	    actions : {
	    	clear : function() {
	    		$(".breadcrumbcustom").html("");
	    		$(".publicInfocustom").html(tradCategory.publicCahnnelExplain);
	    		$(".choiceBtntagList").show(); 
	    		$("#ajaxFormModal #title, #ajaxFormModal #url, #ajaxFormModal #choice").val("");
	    		$(".titletext, .urltext, .publiccheckboxSimple,.publicBtntagList,.publicInfocustom").hide();
	    		$("#btn-submit-form").hide(); 
	    	}
	    },
	    properties : {
	    	info : {
                inputType : "custom",
                html:"<p><i class='fa fa-info-circle'></i> "+tradDynForm.infocreateurl+".</p>",
            },
            breadcrumb : {
                inputType : "custom",
                html:"",
            },
            /*parent :{
            	inputType : "select",
            	placeholder : "Choisir un élément",
            	init : function(){
            		if( userId )
            		{
	            		if(notNull(window.myContacts)){
	            			var html = "";
	            			if(window.myContacts){
							    $.each(window.myContacts, function(groupKey, groupVal) {
							    	if( groupKey != "people" ){
									      var data = ( groupKey ) ? 'data-type="'+groupKey+'"' : "";
									      html += '<optgroup label="'+trad[groupKey]+'" >';
									        $.each(groupVal, function(optKey, optVal) {
									          var slug = ( optVal.slug ) ? 'data-slug="'+optVal.slug+'"' : "";
									          selected = ( contextData && optKey == contextData.id ) ? "selected" : ""; 
									          html += '<option value="'+optVal["_id"]["$id"]+'" '+selected+' '+data+' '+slug+'>'+optVal.name+'</option>';
									        });
									      html += '</optgroup>';
									}
								});
									
							  }
	            			$("#parent").append(html); 
	            		} 
            		}
            	},
            	custom : "<br/><span class='text-small'>Choisir l'élément sur lequel sera associé le channel</span>"
            },*/
            parentId : dyFInputs.inputHidden(  ),
            parentType : dyFInputs.inputHidden(  ),
            parentSlug : dyFInputs.inputHidden(  ),

            choiceBtn :{
                label : "type de chat ? ",
	            inputType : "tagList",
                list :  {
			        "internal"  : { labelFront:"Chat inside CO", icon : "comments" },
			        "external"  : { labelFront:"You use a chat outside CO", icon : "external-link-square"}
			    },
                init : function() {
                	$(".choiceBtn").off().on("click",function()
	            	{
	            		$("#ajaxFormModal #choice").val( $(this).data('key') );
	            		if($(this).data('key') == "internal" ){
	            			$(".titletext,.publicBtntagList,.publicInfocustom").show();			
	            		}
	            		else {
	            			$(".titletext,.urltext").show();
	            		}
	            		$(".choiceBtntagList").hide();
	            		$(".breadcrumbcustom").html( "<h4><a href='javascript:;'' class='btn btn-xs btn-danger'  onclick='dyFObj.elementObj.dynForm.jsonSchema.actions.clear()'><i class='fa fa-times'></i></a> "+$(this).data("tag")+"</h4>");	            		
	            	});
	            }
            },
            choice : dyFInputs.inputHidden(),
            publicBtn :{
                label : "public or private ? ",
	            inputType : "tagList",
                list :  {
			        "public"  : { labelFront:"Public", icon : "unlock",class:"active" },
			        "private"  : { labelFront:"Private", icon : "lock"}
			    },
                init : function() {
                	$(".publicBtn").off().on("click",function()
	            	{
	            		$("#ajaxFormModal #public").val( $(this).data('key') );
	            		$(".publicBtn").removeClass('active');	
	            		$(".publicInfocustom").html( ( $(this).data('key') == "public" ) ? tradCategory.publicChannelExplain : tradCategory.privateChannelExplain );
	            		$(this).addClass('active');
	            	});
	            }
            },
            publicInfo : { inputType : "custom", html: tradCategory.publicChannelExplain},
            public : dyFInputs.inputHidden(),
            title : dyFInputs.inputText(tradDynForm["name"], tradDynForm["channelName"], { required : true }),
            url : dyFInputs.inputUrl(),
            

	    }
	}
};