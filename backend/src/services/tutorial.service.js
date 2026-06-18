const prisma = require("../config/prisma");

const getAllTutorials = async (tagName) => {
  const where = tagName
    ? {
        tags: {
          some: {
            tag: {
              name: tagName,
            },
          },
        },
      }
    : {};

  return await prisma.tutorial.findMany({
    where,

    include: {
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });
};


const createTutorial = async ({
	title,
	description,
	tagIds
}) => {
	return await prisma.tutorial.create({
		data: {
			title,
			description,

			tags: {
				create: tagIds.map((tagId) => ({
					tag: {
						connect: {
							id: tagId
						}
					}
				}))
			}
		},

		include: {
			tags: {
				include: {
					tag: true
				}
			}
		}
	});
};


const updateTutorial = async (id, title, description) => {
	return await prisma.tutorial.update({
		where: {
			id: Number(id)
		},
		data: {
			title, 
			description
		},
		include: {
			tags: {
				include: {
					tag: true
				}
			}
		}
	});
};

const deleteTutorial = async (id) => {
	return await prisma.tutorial.delete({
		where: {
			id: Number(id),
		},
	});
};


module.exports = {
		getAllTutorials,
		createTutorial,
		updateTutorial,
		deleteTutorial
};