import { relations } from 'drizzle-orm'
import { integer, pgTable, serial, text, primaryKey, date, uuid, pgSchema } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'


const authUsers = pgSchema('auth').table('users', {
	id: uuid('id').primaryKey(),
})

export const profiles = pgTable('profiles', {
    id: uuid("id").notNull().primaryKey(),
    firstName: text('firstName'),
    lastName: text('lastName'),
    affiliation: text('affiliation'),
    // imgUrl: text('imgUrl')
})

export const usersRelations = relations(profiles, ({ many, one }) => ({
    projects: many(projects),
    authUser: one(profiles, {
        fields: [profiles.id],
        references: [authUsers.id]
    })
}))

export type InsertUser = typeof profiles.$inferInsert;
export type SelectUser = typeof profiles.$inferSelect;
export const insertUserSchema = createInsertSchema(profiles);
export const selectUserSchema = createSelectSchema(profiles);


export const projects = pgTable('projects', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    description: text('description'),
    ownerId: integer('user_id'),
    lastUpdated: date('last_updated').notNull(),
    createdAt: date('created_at').notNull(),
})

export const projectsRelations = relations(projects, ({ one, many }) => ({
    owner: one(profiles, {
        fields: [projects.ownerId],
        references: [profiles.id],
    }),
    projectToPaper: many(projectToPaper),
    searches: many(searches),
}))

export type InsertProject = typeof projects.$inferInsert;
export type SelectProject = typeof projects.$inferSelect;
export const insertProjectSchema = createInsertSchema(projects);
export const selectProjectSchema = createSelectSchema(projects);


export const searches = pgTable('searches', {
    id: serial('id').primaryKey(),
    query: text('query').notNull(),
    createdAt: date('created_at').notNull(),
    projectId: integer('project_id').notNull(),
})

export const searchesRelations = relations(searches, ({ one }) => ({
    project: one(projects, {
        fields: [searches.projectId],
        references: [projects.id],
    }),
}))

export type InsertSearch = typeof searches.$inferInsert;
export type SelectSearch = typeof searches.$inferSelect;
export const insertSearchSchema = createInsertSchema(searches);
export const selectSearchSchema = createSelectSchema(searches);


export const authors = pgTable('authors', {
    authorId: text('author_id').primaryKey(),
    name: text('name').notNull(),
})

export const authorsRelations = relations(authors, ({ many }) => ({
    authorToPaper: many(authorToPaper),
}))

export type InsertAuthor = typeof authors.$inferInsert;
export type SelectAuthor = typeof authors.$inferSelect;
export const insertAuthorSchema = createInsertSchema(authors);
export const selectAuthorSchema = createSelectSchema(authors);


export const papers = pgTable('papers', {
    paperId: text('paper_id').primaryKey(),
    title: text('title').notNull(),
    year: integer('year').notNull(),
    venue: text('venue'),
    abstract: text('abstract'),
    url: text('url'),
    citationCount: integer('citation_count'),
    referenceCount: integer('reference_count'),
})

export const papersRelations = relations(papers, ({ many }) => ({
    authorToPaper: many(authorToPaper),
    projectToPaper: many(projectToPaper),
}))

export type InsertPaper = typeof papers.$inferInsert;
export type SelectPaper = typeof papers.$inferSelect;
export const insertPaperSchema = createInsertSchema(papers);
export const selectPaperSchema = createSelectSchema(papers);


export const projectToPaper = pgTable(
    "project_to_paper",
    {
        projectId: integer("project_id").notNull(),
        paperId: text("paper_id").notNull(),
    },
    (t) => ({ pk: primaryKey({ columns: [t.projectId, t.paperId] }) })
)

export const projectToPaperRelations = relations(projectToPaper, ({ one }) => ({
    project: one(projects, {
        fields: [projectToPaper.projectId],
        references: [projects.id],
    }),
    paper: one(papers, {
        fields: [projectToPaper.paperId],
        references: [papers.paperId],
    }),
}))

export type InsertProjectToPaper = typeof projectToPaper.$inferInsert;
export type SelectProjectToPaper = typeof projectToPaper.$inferSelect;
export const insertProjectToPaperSchema = createInsertSchema(projectToPaper);
export const selectProjectToPaperSchema = createSelectSchema(projectToPaper);


export const authorToPaper = pgTable(
    'author_to_paper',
    {
        authorId: text('author_id').notNull().references(() => authors.authorId),
        paperId: text('paper_id').notNull().references(() => papers.paperId),
    },
    (t) => ({ pk: primaryKey({ columns: [t.authorId, t.paperId] }) })
)

export const authorToPaperRelations = relations(authorToPaper, ({ one, many }) => ({
    author: one(authors, {
        fields: [authorToPaper.authorId],
        references: [authors.authorId],
    }),
    paper: one(papers, {
        fields: [authorToPaper.paperId],
        references: [papers.paperId],
    }),
}))

export type InsertAuthorToPaper = typeof authorToPaper.$inferInsert;
export type SelectAuthorToPaper = typeof authorToPaper.$inferSelect;
export const insertAuthorToPaperSchema = createInsertSchema(authorToPaper);
export const selectAuthorToPaperSchema = createSelectSchema(authorToPaper);
