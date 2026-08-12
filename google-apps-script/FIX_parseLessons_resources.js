/**
 * PASTE THIS BLOCK over the broken resource-parsing section inside parseLessonsFromSheet().
 * Fixes: SyntaxError Unexpected identifier 'link'
 * Cause: regex literal with [^/] + reusing variable name `title` / undeclared `link`.
 */
      var rawRes = row[resCol] ? row[resCol].toString().trim() : '';
      var parsedResources = [];
      if (rawRes && rawRes.toLowerCase() !== 'không có') {
        var chunks = rawRes.indexOf('||') !== -1 ? rawRes.split(/\s*\|\|\s*/) : [rawRes];
        for (var ci = 0; ci < chunks.length; ci++) {
          var chunk = chunks[ci].toString().trim();
          if (!chunk) continue;
          var resTitle = chunk;
          var resLink = '#';
          var pipeParts = chunk.split(/\s*\|\s*/);
          if (pipeParts.length >= 2 && /^https?:\/\//i.test(pipeParts[pipeParts.length - 1].trim())) {
            resLink = pipeParts[pipeParts.length - 1].trim();
            resTitle = pipeParts.slice(0, -1).join(' | ').trim() || 'Tài liệu';
          } else if (/^https?:\/\//i.test(chunk)) {
            resLink = chunk;
            resTitle = 'Tài liệu tải về';
          }
          // Use RegExp() — do NOT use /drive...([^/]+)/i (breaks Apps Script parser)
          var driveFile = resLink.match(new RegExp('drive\\.google\\.com/file/d/([^/]+)', 'i'));
          if (driveFile && driveFile[1]) {
            resLink = 'https://drive.google.com/uc?export=download&id=' + driveFile[1];
          }
          var rType = (resTitle + ' ' + resLink).toLowerCase().indexOf('xls') !== -1 ||
            (resTitle + resLink).toLowerCase().indexOf('excel') !== -1 ? 'excel' : 'pdf';
          parsedResources.push({ title: resTitle, type: rType, url: resLink });
        }
      }

      lessons.push({
        id: 'sheet-les-' + courseId + '-' + modNum + '-' + lesNum + '-' + r,
        courseId: courseId,
        moduleNumber: modNum,
        lessonNumber: lesNum,
        titleVi: title || ('Bài học ' + lesNum),
        title: title || ('Lesson ' + lesNum),
        videoUrl: video,
        summary: summary,
        descriptionVi: summary,
        resources: parsedResources
      });
