var express     = require('express');
var router      = express.Router();
var validator   = require('validator');
var Entry       = require('../models/entry');

// *** protect from CSRF *** ///
var csrf            = require('csurf');
var csrfProtection  = csrf({ cookie: true })

// =========================================================================
// API ROUTES =============================================================
// =========================================================================

// *** get ALL Entries *** //
router.get('/api/entries', function findAllEntries(req, res) {
  Entry.find({}, function(err, entries) {
    if(err) {
      res.json({
          "STATUS": "ERROR",
          "ERROR": err,
          "ITEMS": []
      });
    } else {
      res.json({
          "STATUS": "SUCCESS",
          "ERROR": "",
          "ITEMS": entries
      });
    }
  });
});

// *** get SINGLE Entries *** //
router.get('/api/entry/:id', function findEntryById(req, res) {
  Entry.findById(req.params.id, function(err, entry) {
    if(err) {
      res.json({
          "STATUS": "ERROR",
          "ERROR": err,
          "ITEMS": []
      });
    } else {
      res.json({
          "STATUS": "SUCCESS",
          "ERROR": "",
          "ITEMS": [entry]
      });
    }
  });
});

// *** post Entry *** //
router.post('/api/entries', csrfProtection, function addEntry(req, res) {

  var newEntry = new Entry({
    user      : req.body.user,
    date      : validator.toDate(req.body.date),
    sum       : validator.toFloat(req.body.sum.toString()),
    category  : validator.escape(req.body.category),
    comment   : validator.escape(req.body.comment)
  });

  newEntry.save(function(err) {
    if (err) {
      res.json({
          "STATUS": "ERROR",
          "ERROR": err,
          "ITEMS": []
      });
    } else {
      res.json({
          "STATUS": "SUCCESS",
          "ERROR": "",
          "ITEMS": [newEntry]
      });
    }
  });
});

// *** put SINGLE Entry *** //
router.put('/api/entry/:id', function updateEntry(req, res) {
  Entry.findById(req.params.id, function(err, entry) {

    if (req.body.date) { entry.date = validator.toDate(req.body.date); }
    if (req.body.sum) { entry.sum = validator.toFloat(req.body.sum.toString()); }
    if (req.body.category) { entry.category = validator.escape(req.body.category); }
    if (req.body.comment) { entry.comment = validator.escape(req.body.comment); }

    entry.save(function(err) {
      if (err) {
        res.json({
            "STATUS": "ERROR",
            "ERROR": err,
            "ITEMS": []
        });
      } else {
        res.json({
            "STATUS": "SUCCESS",
            "ERROR": "",
            "ITEMS": [entry]
        });
      }
    });
  });
});

// *** delete single Entry *** //
router.delete('/api/entry/:id', function deleteEntry(req, res) {
  Entry.findByIdAndRemove(req.params.id, function (err, entry) {
    if (err) {
      res.json({
          "STATUS": "ERROR",
          "ERROR": err,
          "ITEMS": []
      });
    } else {
      res.json({
          "STATUS": "SUCCESS",
          "ERROR": "",
          "ITEMS": [entry]
      });
    }
  });
});

module.exports = router;