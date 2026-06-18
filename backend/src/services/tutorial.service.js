const prisma = require("../config/prisma");

// trae tutoriales, con filtro opcional por tag
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

// crea tutorial con sus tags
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

// actualiza tutorial
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

// elimina tutorial
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