import axios from 'axios';
import 'dotenv/config';
import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { Readable } from 'stream';
import path from 'path';

const apiBaseUrl = process.env.VITE_BE_API_URL;
const hostname = 'https://www.praxiaskill.com'

const staticRoutes = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/courses', changefreq: 'weekly', priority: 0.9 },
    { url: '/ccfs', changefreq: 'monthly', priority: 0.8 },
    { url: '/eventForm', changefreq: 'monthly', priority: 0.6 },
    { url: '/contact-us', changefreq: 'monthly', priority: 0.6 },
    { url: '/foundational-skill', changefreq: 'monthly', priority: 0.6 },
    { url: '/entrepreneurial-skill', changefreq: 'monthly', priority: 0.6 },
    { url: '/employability-skill', changefreq: 'monthly', priority: 0.6 },
];

async function fetchAllCourseSlugs() {
    let allCourses = [];
    let page = 1;
    const limit = 100;

    while (true) {
        const res = await axios.get(`${apiBaseUrl}/api/course/all?page=${page}&limit=${limit}`);
        const courses = res.data?.data?.courses || [];

        if (courses.length === 0) break;

        allCourses = allCourses.concat(courses);
        if (courses.length < limit) break;
        page++;
    }

    return allCourses.map(course => ({
        url: `/course/${course.slug}`,
        changefreq: 'weekly',
        priority: 0.8,
    }));
}

async function generateSitemap() {
    try {
        const dynamicCourseRoutes = await fetchAllCourseSlugs();
        const allRoutes = [...staticRoutes, ...dynamicCourseRoutes];

        const stream = new SitemapStream({ hostname });

        const sitemap = await streamToPromise(Readable.from(allRoutes).pipe(stream));

        const filePath = path.resolve('./dist/sitemap.xml');
        createWriteStream(filePath).write(sitemap.toString());

        console.log(`Sitemap created with ${allRoutes.length} routes`);
    } catch (err) {
        console.error('Sitemap generation failed:', err.message);
    }
}

generateSitemap();
