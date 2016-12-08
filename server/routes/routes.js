var express = require('express');
var router = express.Router();
var Entry = require('../models/entry');

router.get('/', function(req, res, next) {
  // res.send('Hello, World!');
  res.render('index', {
    title: 'Index page'
  });
});

// *** get ALL Entries *** //
router.get('/api/entries', function findAllEntries(req, res) {
  Entry.find(function(err, entries) {
    if(err) {
      res.json({'ERROR': err});
    } else {
      res.json(entries);
    }
  });
});


// *** get SINGLE Entries *** //
router.get('/api/entry/:id', function findEntryById(req, res) {
  Entry.findById(req.params.id, function(err, entry) {
    if(err) {
      res.json({'ERROR': err});
    } else {
      res.json(entry);
    }
  });
});


// *** post Entry *** //
router.post('/api/entries', function addEntry(req, res) {

  var newEntry = new Entry({
    user      : req.body.user,
    date      : req.body.date,
    sum       : req.body.sum,
    category  : req.body.category,
    comment   : req.body.comment
  });

  newEntry.save(function(err) {
    if(err) {
      res.json({'ERROR': err});
    } else {
      res.json({'SUCCESS': newEntry});
    }
  });
});

// *** put SINGLE Entry *** //
router.put('/api/entry/:id', function updateEntry(req, res) {
  Entry.findById(req.params.id, function(err, entry) {
    Entry.name = req.body.sum;
    Entry.save(function(err) {
      if(err) {
        res.json({'ERROR': err});
      } else {
        res.json({'UPDATED': entry});
      }
    });
  });
});

// *** delete single Entry *** //
router.delete('/api/entry/:id', function deleteEntry(req, res) {
  Entry.findByIdAndRemove(req.params.id, function (err, entry) {
    if(err) {
      res.json({'ERROR': err});
    } else {
      res.json({'REMOVED': entry});
    }
  });
});

module.exports = router;
