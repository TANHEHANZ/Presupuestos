import { NAV } from "../../../src/infraestructure/constants/nav/index";
import { prismaC } from "../../../src/infraestructure/config/prisma.client";

export async function seederNavigation() {
  for (const section of NAV) {
    const existingGroup = await prismaC.u_groupNav.findFirst({
      where: { title: section.title },
    });

    const group =
      existingGroup ||
      (await prismaC.u_groupNav.create({
        data: {
          title: section.title,
        },
      }));

    for (const item of section.items) {
      const existingItem = await prismaC.u_navigation.findFirst({
        where: {
          path: item.path,
        },
      });

      if (!existingItem) {
        await prismaC.u_navigation.create({
          data: {
            nombre: item.label,
            path: item.path,
            icon: item.icon,
            groupId: group.id,
            requiredPerms: item.requiredPerms,
          },
        });
      } else {
        console.log(`Ya existe: ${item.label} → ${item.path}`);
      }
    }
  }

  console.log("✅ Seeder de navegación completado.");
}
