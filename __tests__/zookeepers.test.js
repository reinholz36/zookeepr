const fs = require('fs');
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper,
} = require("../lib/zookeepers.js");
const { zookeepers } = require("../data/zookeepers.json");

jest.mock('fs');

test("create a zookeeper object", () => {
    const zookeeper = createNewZookeeper(
        { name: "Kim", age: 28},
        zookeepers
    );

    expect(zookeeper.name).toBe("Kim");
    expect(zookeeper.age).toBe(28);
});

test("filters by query", () => {
    const startingZookeepers = [
        {
            id: "1",
            name: "Raksha",
            age: 31,
            favoriteAnimal: "penguin"
        },
        {
            id: "2",
            name: "Isabella",
            age: 67,
            favoriteAnimal: "bear"
        },
    ];

    const updatedZookeepers = filterByQuery({ name: "Raksha" }, startingZookeepers);

    expect(updatedZookeepers.length).toEqual(1);
});

test("find by id", () => {
    const startingZookeepers = [
        {
            id: "1",
            name: "Raksha",
            age: 31,
            favoriteAnimal: "penguin"
        },
        {
            id: "2",
            name: "Isabella",
            age: 67,
            favoriteAnimal: "bear"
        },
    ];

    const result = findById("2", startingZookeepers);

    expect(result.name).toBe("Isabella");
});

test("validates favorite animal", () => {
    const zookeeper = {
        id: "2",
        name: "Isabella",
        age: 67,
        favoriteAnimal: "bear"
    };

    const invalidZookeeper = {
        id: "2",
        name: "Isabella",
        age: 67,
        
    };

    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper)

    expect(result).toBe(true);
    expect(result2).toBe(false);

});