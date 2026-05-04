import 'package:dogayo_github_io/data/models/models.dart';
import 'package:flutter/services.dart' as serv;

abstract interface class PortfolioService {
  Future<PortfolioInfo> getPortfolioInfo();
}

class PortfolioService$Assets implements PortfolioService {
  @override
  Future<PortfolioInfo> getPortfolioInfo() async {
    final raw = await serv.rootBundle.loadString('assets/docs/info_me.json');
    return PortfolioInfo.fromJsonString(raw);
  }
}
