const neo4j = require('neo4j-driver');
const driver = new neo4j.driver(process.env.NEO4J_HOST, neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD));
const session = driver.session({
    database: 'neo4j',
});

console.log("conectado ao neo4j");

const addUser = async (id, name, email, filename) => {
    const newUserNeo4j = await session.run(
        'CREATE (n: User {id: $id, name: $name, email: $email, filename: $filename}) RETURN n', {
            id: id, name: name, email: email, filename: filename
        }
    )
    return newUserNeo4j;
    //session.close()
}

// const allUsers = async () => {
//     const results = await session.run("MATCH (n) RETURN (n)", {});

//     const nodes = [];
//     await results.records.forEach(res => {
//         nodes.push({id: res.get(0).properties.id, name: res.get(0).properties.name, filename:  res.get(0).properties.filename })
//     })

//     //console.log(nodes);
//     return nodes;
// }

const addFriend = async (id1, id2) => {
    // console.log("aqui")
    // console.log(id1 + "______" + id2);
    const results = await session.run("MATCH (a:User), (b:User) WHERE a.id = $id1 AND b.id = $id2 CREATE (a)-[r:FRIEND_OF]->(b) RETURN a  ",{id1: id1, id2: id2});

    return results;
}
const deleteFriend = async (id1, id2) => {
    const results = await session.run("MATCH (a:User {id: $id1})-[r:FRIEND_OF]->(b:User {id: $id2}) DELETE r",{id1: id1, id2: id2});

    const nodes = [];
    await results.records.forEach(res => {
        nodes.push({id: res.get(0).properties.id, name: res.get(0).properties.name, filename:  res.get(0).properties.filename })
    })

    return nodes;
}

const notMyFriends = async (id) => {
    const results = await session.run("MATCH (a:User {id: $id}), (b:User) WHERE NOT (a)-[:FRIEND_OF]->(b) AND b<>a RETURN b", {id: id});

    const nodes = [];
    await results.records.forEach(res => {
        nodes.push({id: res.get(0).properties.id, name: res.get(0).properties.name, filename:  res.get(0).properties.filename })
    })

    return nodes;
}

const myFriends = async (id) => {
    const results = await session.run("MATCH (a:User {id: $id}), (b:User) WHERE (a)-[:FRIEND_OF]->(b) RETURN b", {id: id});

    const nodes = [];
    await results.records.forEach(res => {
        nodes.push({id: res.get(0).properties.id, name: res.get(0).properties.name, filename:  res.get(0).properties.filename })
    })

    return nodes;
}



//driver.close();

module.exports = {addUser, addFriend, notMyFriends, myFriends, deleteFriend};