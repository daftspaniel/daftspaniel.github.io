// **************************************************************************
// Generator: Instance of 'Compiler'
// **************************************************************************

// ignore_for_file: cancel_subscriptions,constant_identifier_names,duplicate_import,non_constant_identifier_names,library_prefixes,UNUSED_IMPORT,UNUSED_SHOWN_NAME
import 'main.dart';
export 'main.dart';
import 'package:angular/angular.dart';
import 'package:pwa/client.dart' as pwa;
import 'package:np8080/src/app.template.dart' as ng;
import 'rootinjector.dart';
import 'package:angular/angular.template.dart' as _ref0;
import 'package:np8080/src/app.template.dart' as _ref1;
import 'rootinjector.template.dart' as _ref2;

var _visited = false;
void initReflector() {
  if (_visited) {
    return;
  }
  _visited = true;

  _ref0.initReflector();
  _ref1.initReflector();
  _ref2.initReflector();
}
