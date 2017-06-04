export default function (userCoordinates) {
    let agregationArg = [
        {
            $geoNear: {
                near: { type: 'Point', coordinates: userCoordinates },
                distanceField: 'dist.calculated',
                includeLocs: 'dist.location',
                spherical: true
            }
        },
        {
            $project: {
                updatedAt: 1,
                createdAt: 1,
                title: 1,
                eventId: 1,
                audience: 1,
                date: 1,
                loc: 1,
                inCircle: {$lt: ['$dist.calculated', '$audience.radius']}
            }
        },
        {
            $match: {
                inCircle: true
            }
        }
    ];

    function addAgeRestriction(userAge) {
        agregationArg.push({
            $match: {
                $or: [
                    {
                        $and: [
                            {
                                'audience.age.0': {$lt: userAge}
                            },
                            {
                                'audience.age.1': {$gt: userAge}
                            }
                        ]
                    },
                    {
                        'audience.age': {$size: 0}
                    }
                ]
            }
        });
        return this;
    }

    function addGenderRestriction(userGender) {
        agregationArg.push({
            $match: {
                $or: [
                    {
                        'audience.gender': {$exists: false}
                    },
                    {
                        'audience.gender': {$eq: userGender}
                    }
                ]
            }
        });
        return this;
    }

    function addSortRestriction() {
        // agregationArg.push({
        //     $match: {
        //         date: {$gt: new Date()}
        //     }
        // });
        agregationArg.push({
            $sort: {
                date: 1
            }
        });
        return this;
    }

    function prepareQuery() {
        return agregationArg;
    }

    return {
        addAgeRestriction,
        addGenderRestriction,
        addSortRestriction,
        prepareQuery
    };
}