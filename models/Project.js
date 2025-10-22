const pool = require('../db/db');

const createSlug = (title) => {
    return title.toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');
}

const createProject = async (title, github, link, img, description) => {
    const client = await pool.connect();
    try{
        await client.query('BEGIN');
        const slug = createSlug(title);
        const query = `
            INSERT INTO projects (title, github, link, description, slug)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id;
        `;
        // insert img into seperate table.
        const values = [title, github, link, description, slug]
        const result = await client.query(query, values);
        for(let i = 0; i < img.length; i++){
            const secondQuery = `
                INSERT INTO project_images (project_id, img_url)
                VALUES ($1, $2);
            `;
            const secondValues = [result.rows[0].id, img[i]];
            await client.query(secondQuery, secondValues);
        }
        await client.query('COMMIT');
        return result.rows[0];
    } catch (err){
        await client.query('ROLLBACK');
        console.log(err);
    }finally{
        client.release();
    }
}

const getAllProjects = async () => {
    const query = `
        SELECT p.id, p.title, p.github, p.link, p.description, p.slug,
        COALESCE(
            JSON_AGG(i.img_url) FILTER (WHERE i.img_url IS NOT NULL), '[]'
        ) AS images
        FROM projects p
        LEFT JOIN project_images i ON p.id = i.project_id
        GROUP BY p.id, p.title, p.github, p.link, p.description, p.slug
        ORDER BY p.id;
    `;
    try{
        const result = await pool.query(query);
        return result.rows;
    }catch (err){
        console.log(err);
    }
}

const getProject = async (id) => {
    const query = `
        SELECT p.id, p.title, p.github, p.link, p.description, p.slug,
        COALESCE(
            JSON_AGG(i.img_url) FILTER (WHERE i.img_url IS NOT NULL), '[]'
        ) AS images
        FROM projects p
        LEFT JOIN project_images i ON p.id = i.project_id
        WHERE p.id = $1
        GROUP BY p.id, p.title, p.github, p.link, p.description, p.slug;
    `;
    const value = [id];
    try{
        const result = await pool.query(query, value);
        return result.rows;
    }catch (err){
        console.log(err);
    }
}

const getProjectByTitleToSlug = async (title) => {
    const slug = createSlug(title);
    const query = `
        SELECT id, title FROM projects WHERE slug = $1;
    `
    try{
        const result = await pool.query(query, [slug]);
        return result.rows;
    }catch (err){
        console.log(err);
    }
}

const getProjectBySlug = async (slug) => {
    const query = `
        SELECT id FROM projects WHERE slug = $1;
    `
    try{
        const projectId = await pool.query(query, [slug]);
        if(projectId.rows.length === 0){
            return [];
        }
        const result = await getProject(projectId.rows[0].id);
        return result;
    }catch (err){
        console.log(err);
    }
}

const deleteProject = async (id) => {
    const query = `
        DELETE FROM projects WHERE id = $1;
    `
    const value = [id];
    try{
        const result = await pool.query(query, value);
        return result.rowCount;
    }catch (err){
        console.log(err);
    }
}

const updateProject = async (id, title, github, link, img, description) => {
    const client = await pool.connect();
    try{
        await client.query('BEGIN')
        const replaceImgs = `
            DELETE FROM project_images WHERE project_id = $1;
        `
        await client.query(replaceImgs, [id]);

        for(let i = 0; i < img.length; i++){
            const secondQuery = `
                INSERT INTO project_images (project_id, img_url)
                VALUES ($1, $2);
            `;
            const secondValues = [id, img[i]];
            await client.query(secondQuery, secondValues);
        }
    
        const slug = createSlug(title);
        const query = `
            UPDATE projects SET title = $1, github = $2, link = $3 description = $4, slug = $5
            WHERE id = $6;
        `;
        const values = [title, github, link, description, slug, id];
        const result = await client.query(query, values);
        await client.query('COMMIT');
        return result.rowCount;
    }catch (err){
        await client.query('ROLLBACK');
        console.log(err);
    }finally{
        client.release();
    }
}




module.exports = {
    getAllProjects,
    createProject,
    deleteProject,
    updateProject,
    getProject,
    getProjectByTitleToSlug,
    getProjectBySlug
};