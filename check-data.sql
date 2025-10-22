SELECT 'Projects:' as table_name, COUNT(*) as count FROM projects
UNION ALL
SELECT 'Videos:', COUNT(*) FROM videos
UNION ALL
SELECT 'CV Sections:', COUNT(*) FROM cv_sections
UNION ALL
SELECT 'Page Sections:', COUNT(*) FROM page_sections;
