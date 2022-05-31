//Delete Triggers

  //Access Type Deletion Trigger
  Parse.Cloud.beforeDelete("AccessTypes", async (request) => {
    const query = new Parse.Query(Parse.User);
    query.equalTo("access_type", request.object.id);
    const count = await query.count({useMasterKey:true})
    if (count > 0) {
      throw "Can't Delete Access Type, because it is currently being used by an account.";
    }
  });

  //Application Type Deletion Trigger
  Parse.Cloud.beforeDelete("ApplicationTypes", async (request) => {
    //Check Applications
    const Applications = Parse.Object.extend("Applications");
    const appQuery = new Parse.Query(Applications)
    appQuery.equalTo("applicationType", request.object.id)
    const appCount = await appQuery.count({useMasterKey:true})
    if (appCount > 0) {
      throw "Can't Delete Application Type, because it is used by an Application";
    }
  });

  //Designation Deletion Trigger
  Parse.Cloud.beforeDelete("Designations", async (request) => {
    const query = new Parse.Query(Parse.User);
    query.equalTo("designation", request.object.id);
    const count = await query.count({useMasterKey:true})
    if (count > 0) {
      throw "Can't Delete Designation, because it is currently being used by an account.";
    }
  });

  //HEI Type Deletion Trigger
  Parse.Cloud.beforeDelete("HEI_Types", async (request) => {
    const query = new Parse.Query(Parse.User);
    query.equalTo("hei_type", request.object.id);
    const count = await query.count({useMasterKey:true})
    if (count > 0) {
      throw "Can't Delete HEI Type, because it is currently being used by an account.";
    }
  });

  //Discipline Deletion Trigger
  Parse.Cloud.beforeDelete("Disciplines", async (request) => {
    const query = new Parse.Query(Parse.User);
    query.equalTo("discipline", request.object.id);
    const count = await query.count({useMasterKey:true})
    if (count > 0) {
      throw "Can't Delete Discipline, because it is currently being used by an account.";
    }

    const Disciplines = Parse.Object.extend("Disciplines");
    const discQuery = new Parse.Query(Disciplines)
    discQuery.equalTo("objectId", request.object.id)
    const discData = await discQuery.first()

    var specificDisciplines = [];
    for (var i = 0; i < discData.get("specificDiscipline").length; i++) {
        specificDisciplines.push(discData.get("specificDiscipline")[i].SpecDiscCode)
    }

    const Programs = Parse.Object.extend("Programs");
    const programQuery = new Parse.Query(Programs);
    programQuery.containedIn("programDiscipline", specificDisciplines)

    const progCount = await programQuery.count({useMasterKey:true})
    if (progCount > 0) {
      throw "Can't Delete Discipline, because it is currently linked to a Program.";
    }
  });

  //Program Deletion Trigger
  Parse.Cloud.beforeDelete("Programs", async (request) => {

    //Check Applications
    const Applications = Parse.Object.extend("Applications");
    const appQuery = new Parse.Query(Applications)
    appQuery.equalTo("program", request.object.id)
    const appCount = await appQuery.count({useMasterKey:true})
    if (appCount > 0) {
      throw "Can't Delete Program, because it is used in an Application";
    }

    //Check Evaluation Instruments
    const EvalInsts = Parse.Object.extend("EvaluationInstruments");
    const evalInstQuery = new Parse.Query(EvalInsts)
    evalInstQuery.equalTo("program", request.object.id)
    const evalInstCount = await evalInstQuery.count({useMasterKey:true})
    if (evalInstCount > 0) {
      throw "Can't Delete Program, because it is used in an Evaluation Instrument";
    }
  });

  //CHED MEMO Deletion Trigger
  Parse.Cloud.beforeDelete("CHED_MEMO", async (request) => {

    //Check Evaluation Instruments\
    const instruments = Parse.Object.extend("EvaluationInstruments");
    const evalInsQuery = new Parse.Query(instruments);
    const evalInsResult = await evalInsQuery.find();

    var usedCMOs = [];

    for (var i = 0; i < evalInsResult.length; i++) {
      const evalInst = evalInsResult[i];
      for(var j = 0; j < evalInst.get("evalInstReqs").length; j++) {
        usedCMOs.push(evalInst.get("evalInstReqs")[j].cmoID)
      }
    }
    if (usedCMOs.includes(request.object.id)) {
      throw "Can't Delete CHED MEMORANDUM, because it is used in an Evaluation Instrument";
    }
  });

  //Evaluation Instruments Deletion Trigger
  Parse.Cloud.beforeDelete("EvaluationInstruments", async (request) => {

    //Check Evaluation Instruments
    const EvalInsts = Parse.Object.extend("EvaluationInstruments");
    const evalInstQuery = new Parse.Query(EvalInsts);
    evalInstQuery.equalTo("objectId", request.object.id);
    const evalInstData = await evalInstQuery.first();

    const Applications = Parse.Object.extend("Applications");
    const appQuery = new Parse.Query(Applications)
    appQuery.equalTo("program", evalInstData.get("evaluationFormProgram"))
    const appCount = await appQuery.count({useMasterKey:true})
    if (appCount > 0) {
      throw "Can't Delete Evaluation Instrument, because it is used by a Program used in an Application";
    }
  });



  

  //Users Deletion Trigger
  Parse.Cloud.beforeDelete(Parse.User, async (request) => {
    
    //HEI Deletion Trigger
      //RQAT query
      const rqatQuery = new Parse.Query(Parse.User);
      rqatQuery.equalTo("hei_affil", request.object.id);
      const rqatCount = await rqatQuery.count({useMasterKey:true}) 
      if (rqatCount > 0) {
        throw "Can't Delete HEI, because it is currently an Affiliation of an RQAT.";
      }

      const Applications = Parse.Object.extend("Applications");
      const appQuery = new Parse.Query(Applications)
      var heiQuery = appQuery.equalTo("createdBy", request.object.id)
      const appCount = await heiQuery.count({useMasterKey:true})
      if (appCount > 0) {
        throw "Can't Delete HEI, because it has records on application of programs";
      }

    //RQAT Deletion Trigger
    var rqatQuer = appQuery.equalTo("selectedRQAT", request.object.id);
    const appRQATCount = await rqatQuer.count({useMasterKey:true})
    if (appRQATCount > 0) {
      throw "Can't Delete RQAT, because it is linked to an application";
    }

    //Employee Deletion Trigger
      //Education Supervisor Deletion Trigger
      var educSupervisorQuery = appQuery.equalTo("selectedSupervisor", request.object.id)
      const appEducSupCount = await educSupervisorQuery.count({useMasterKey:true})
      if (appEducSupCount > 0) {
        throw "Can't Delete Education Supervisor, because it is linked to an application";
      }

  });

  //Access Type beforeSave for unique name
  Parse.Cloud.beforeSave("AccessTypes", async(request) => {
    const AccessTypes = Parse.Object.extend("AccessTypes");
    const query = new Parse.Query(AccessTypes)
    query.equalTo("name", request.object.get("name"))
      
    const accessTypeCount = await query.count({useMasterKey:true})
    if (accessTypeCount > 0) {
      throw "Access Type Already Exists";
    }
  })

  //Designation beforeSave for unique name
  Parse.Cloud.beforeSave("Designations", async(request) => {
    const Designations = Parse.Object.extend("Designations");
    const query = new Parse.Query(Designations)
    query.equalTo("name", request.object.get("name"))
      
    const designationCount = await query.count({useMasterKey:true})
    if (designationCount > 0) {
      throw "Designation Already Exists";
    }
  })