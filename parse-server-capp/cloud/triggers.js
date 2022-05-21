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

  //HEI Type Deletion Trigger
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

    const progCount = await query.count({useMasterKey:true})
    if (progCount > 0) {
      throw "Can't Delete Discipline, because it is currently linked to a Program.";
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