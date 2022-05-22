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
    appQuery.equalTo("applicationTypeName", request.object.id)
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

    //Check Evaluation Instruments
    const EvalInsts = Parse.Object.extend("EvaluationInstruments");
    const evalInstQuery = new Parse.Query(EvalInsts)
    evalInstQuery.equalTo("evalInstReqs", request.object.id)
    const evalInstCount = await evalInstQuery.count({useMasterKey:true})
    if (evalInstCount > 0) {
      throw "Can't Delete CHED MEMORANDUM, because it is used in an Evaluation Instrument";
    }
  });

  //Evaluation Instruments Deletion Trigger
  Parse.Cloud.beforeDelete("CHED_MEMO", async (request) => {

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



  

//   //HEI Deletion Trigger
//   Parse.Cloud.beforeDelete(Parse.User, async (request) => {
    
//     //RQAT query
//     const rqatQuery = new Parse.Query(Parse.User);
//     rqatQuery.equalTo("hei_affil", request.object.id);
//     const rqatCount = await rqatQuery.count({useMasterKey:true})

//     // query
//     const rqatQuery = new Parse.Query(Parse.User);
//     rqatQuery.equalTo("hei_affil", request.object.id);
//     const count = await rqatQuery.count({useMasterKey:true})

//     if (rqatCount > 0) {
//       throw "Can't Delete HEI, because it is currently being used in an rqat.";
//     }
//   });