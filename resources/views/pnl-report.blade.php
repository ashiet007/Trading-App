<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="utf-8">
      <title>PDF</title>
      <meta name="description" content="NISSAN">
      <meta name="author" content="NISSAN">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <link rel="preconnect" href="https://fonts.gstatic.com">
      {{-- <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap" rel="stylesheet"> --}}
      <style>
          @font-face {
            font-family: 'Lato';
            src: url("{{ storage_path('fonts/Lato-Regular.ttf') }}") format("truetype");
            font-weight: 400;
            font-style: normal;
        }
      </style>
   </head>
   <body style="font-weight: normal;padding:0;margin:0;font-family: 'Lato', sans-serif;background:#eee ;">
      <table class="table1 main-wrap" style="width:100%;max-width:800px;margin:auto;border-collapse: collapse;">
         <tr>
            <td style="width:100%;vertical-align: top;padding:0;">
               <table class="table page1"
                  style="width:100%;background:#fff;border-collapse: collapse;margin:10px 0;">
                  <tr>
                     <th style="border-bottom:2px solid #470ad2;padding-bottom: 10px;padding-top: 10px"><a href="#"><img class="logo" src="http://trade.levitas-globalmarkets.com/images/logo_levitas_small.png" width="200"></a>
                        <address>Suite 305, Griffith Corporate Centre, Kingstown, St. Vincent and the Grenadines.</address>
                        <a href="mailto:info@levitasglobal.com" target="_blank" style="color:#0080c1;text-decoration: none;">info@levitasglobal.com</a>
                    </th>
                  </tr>
                  <tr>
                     <td  colspan='2' style="width:100%;vertical-align: top;padding:0;background-color:#fff!important;">
                        <table class="mainn"
                           style="width:100%;border-collapse: collapse;border-top:1px solid #D0D0D0;background-color:#fff!important;">
                           <tr>
                              <td style="width:33.333%;text-align:left;padding:20px 20px;background-color:#fff!important;" class="ssaii">
                                 <p style="font-size:16px;color:#000;line-height: 1.5;">Dear <strong>{{$name}}</strong>,</p>
                                 <p style="font-size:16px;color:#000;line-height: 1.5;text-align: left;margin-bottom:0;">Thank You for choosing us. Below you can find your withdrawal report:</p>
                              </td>
                           </tr>
                           <tr>
                              <td style="padding:0 20px">
                                 <table style="border-radius: 8px;width:100%;margin:auto;border-collapse: collapse;background: #eee;">
                                    <tr>
                                       <td style="padding:10px 20px;">
                                          <table style=" border-radius: 8px;width:100%;margin:auto;border-collapse: collapse;padding: 20px;">
                                             <tr>
                                                <td style="padding:8px;border-bottom:2px solid #fff;font-size:15px;color:#000;line-height: 1.5;"><strong>Name:</strong></td>
                                                <td style="padding:8px;border-bottom:2px solid #fff;font-size:15px;color:#000;line-height: 1.5;">{{$name}}</td>
                                             </tr>
                                             <tr>
                                                <td style="padding:8px;border-bottom:2px solid #fff;font-size:15px;color:#000;line-height: 1.5;"><strong>Date of Birth:</strong></td>
                                                <td style="padding:8px;border-bottom:2px solid #fff;font-size:15px;color:#000;line-height: 1.5;">{{isset($kyc)?\Carbon\Carbon::parse($kyc->birth_date)->format('d-m-Y'):"10-05-1993"}}</td>
                                             </tr>
                                             <tr>
                                                <td style="padding:8px;border-bottom:2px solid #fff;font-size:15px;color:#000;line-height: 1.5;"><strong>Email:</strong></td>
                                                <td style="padding:8px;border-bottom:2px solid #fff;font-size:15px;color:#000;line-height: 1.5;">{{$email}}</td>
                                             </tr>
                                             <tr>
                                                <td style="padding:8px;font-size:15px;color:#000;line-height: 1.5;"><strong>Address:</strong></td>
                                                <td style="padding:8px;font-size:15px;color:#000;line-height: 1.5;">{{isset($kyc)?$kyc->address.", ".$kyc->city.", ".$kyc->state.", ".$kyc->country_name.", ".$kyc->zip_code:"330 SW 2nd St, Fort Lauderdale, FL 33312"}}</td>
                                             </tr>
                                          </table>
                                       </td>
                                    </tr>
                                 </table>
                              </td>
                           </tr>
                           @php
                               $buyTotal = 0;
                               $sellTotal = 0;
                               $totalPnL = 0;
                           @endphp
                           <tr>
                              <td style="padding:20px;font-size:15px;color:#000;line-height: 1.5;">
                                 Your report is shared below:
                              </td>
                           </tr>
                           <tr>
                              <td style="padding:0 20px">
                                 <table style="border-radius: 8px;width:100%;margin:auto;border-collapse: collapse;background: #fff;">
                                    <tr>
                                       <td style="padding:0;">
                                          <table style=" border-radius: 8px;width:100%;margin:auto;border-collapse: collapse;padding: 20px;">
                                             <tr>
                                                <th style="background-color:#ddd;padding:8px;border:1px solid #666;font-size:14px;color:#000;line-height: 1.5;"><strong>Date</strong></th>
                                                <th style="background-color:#ddd;padding:8px;border:1px solid #666;font-size:14px;color:#000;line-height: 1.5;"><strong>Market Name</strong></th>
                                                <th style="background-color:#ddd;padding:8px;border:1px solid #666;font-size:14px;color:#000;line-height: 1.5;"><strong>Profit and Loss</strong></th>
                                                <th style="background-color:#ddd;padding:8px;border:1px solid #666;font-size:14px;color:#000;line-height: 1.5;"><strong>Transaction Type</strong></th>
                                                <th style="background-color:#ddd;padding:8px;border:1px solid #666;font-size:14px;color:#000;line-height: 1.5;"><strong>Open Level</strong></th>
                                                <th style="background-color:#ddd;padding:8px;border:1px solid #666;font-size:14px;color:#000;line-height: 1.5;"><strong>Close Level</strong></th>
                                                <th style="background-color:#ddd;padding:8px;border:1px solid #666;font-size:14px;color:#000;line-height: 1.5;"><strong>Size</strong></th>
                                                <th style="background-color:#ddd;padding:8px;border:1px solid #666;font-size:14px;color:#000;line-height: 1.5;"><strong>Currency</strong></th>
                                             </tr>
                                             @foreach ($reports as $report)
                                                @if ($report->market_type == \App\Models\Deal::STOCKS)
                                                    @php
                                                        $ticker = \App\Models\Stock::where('ticker',$report->market)->first();
                                                    @endphp
                                                @endif
                                                <tr>
                                                    <td style="background-color:#ddd;padding:8px;border:1px solid #666;font-size:14px;color:#000;line-height: 1.5;"><strong>{{\Carbon\Carbon::parse($report->created_at)->format('d/m/Y')}} </strong></td>
                                                    <td style="padding:8px;border:1px solid #666;font-size:14px;color:#000;line-height: 1.5;">{{$report->market_type == \App\Models\Deal::STOCKS ? $ticker->name:$report->market}} </td>
                                                    <td style="padding:8px;border:1px solid #666;font-size:14px;color:#000;line-height: 1.5;">£{{$report->profit_loss}}  </td>
                                                    <td style="padding:8px;border:1px solid #666;font-size:14px;color:#000;line-height: 1.5;">{{$report->type == 'buy'?"LONG":"SHORT"}}  </td>
                                                    <td style="padding:8px;border:1px solid #666;font-size:14px;color:#000;line-height: 1.5;">{{$report->opening}} </td>
                                                    <td style="padding:8px;border:1px solid #666;font-size:14px;color:#000;line-height: 1.5;">{{$report->latest}} </td>
                                                    <td style="padding:8px;border:1px solid #666;font-size:14px;color:#000;line-height: 1.5;">{{$report->size}} </td>
                                                    <td style="padding:8px;border:1px solid #666;font-size:14px;color:#000;line-height: 1.5;">£</td>
                                                </tr>
                                                @if ($report->type == 'buy')
                                                    @php
                                                        $buyTotal =  $report->opening;
                                                        $sellTotal = $report->latest;
                                                        $totalPnL = $totalPnL + $report->profit_loss;
                                                    @endphp
                                                @else
                                                    @php
                                                        $buyTotal =  $report->latest;
                                                        $sellTotal = $report->opening;
                                                        $totalPnL = $totalPnL + $report->profit_loss;
                                                    @endphp
                                                @endif
                                             @endforeach
                                          </table>
                                       </td>
                                    </tr>
                                 </table>
                              </td>
                           </tr>
                           <tr>
                              <td style="padding:20px;font-size:15px;color:#000;line-height: 1.5;">
                                 Your withdrawal report is here:
                              </td>
                           </tr>
                           <tr>
                              <td style="padding:0 20px">
                                 <table style="border-radius: 8px;width:100%;margin:auto;border-collapse: collapse;background: #fff;">
                                    <tr>
                                       <td style="padding:0;">
                                          <table style=" border-radius: 8px;width:100%;margin:auto;border-collapse: collapse;padding: 20px;">
                                             <tr>
                                                <th style="background-color:#ddd;padding:8px;border:1px solid #666;font-size:14px;color:#000;line-height: 1.5;"><strong>Date</strong></th>
                                                <th style="background-color:#ddd;padding:8px;border:1px solid #666;font-size:14px;color:#000;line-height: 1.5;"><strong>Amout</strong></th>
                                                <th style="background-color:#ddd;padding:8px;border:1px solid #666;font-size:14px;color:#000;line-height: 1.5;"><strong>Wallet Balance</strong></th>
                                                <th style="background-color:#ddd;padding:8px;border:1px solid #666;font-size:14px;color:#000;line-height: 1.5;"><strong>Status</strong></th>
                                             </tr>
                                             <tr>
                                                <td style="background-color:#ddd;padding:8px;border:1px solid #666;font-size:14px;color:#000;line-height: 1.5;"><strong>{{\Carbon\Carbon::parse('2021-12-03 00:00:00')->format('d/m/Y')}}</strong></td>
                                                <td style="padding:8px;border:1px solid #666;font-size:14px;color:#000;line-height: 1.5;">£700 </td>
                                                <td style="padding:8px;border:1px solid #666;font-size:14px;color:#000;line-height: 1.5;">£516.12775  </td>

                                                <td style="padding:8px;border:1px solid #666;font-size:14px;line-height: 1.5;" class="text-success">Success </td>
                                             </tr>
                                          </table>
                                       </td>
                                    </tr>
                                 </table>
                              </td>
                           </tr>
                           <tr>
                              <td style="padding:0 20px;">
                                 <h4 style="font-size:16px;margin-top:30px;color:#222;margin-bottom:0;line-height: 1.5;">Is there anything you want to share with us?</h4>
                                 <p style="font-size:14px;margin-top:5px;color:#666;margin-bottom:30px;line-height: 1.5;border-bottom:1px solid #ddd;padding-bottom:30px;">Feedback, comments, suggestions or compliments - do contact to:</p>
                                 <p style="font-size:14px;margin-top:5px;color:#666;margin-bottom:30px;line-height: 1.5;padding-bottom:30px;">
                                    <address>
                                        Suite 305, Griffith Corporate
                                        Centre, Kingstown, St. Vincent and the Grenadines
                                    </address>
                                    <a href="mailto:info@levitasglobal.com" target="_blank" style="color:#0080c1;text-decoration: none;">info@levitasglobal.com</a>
                                </p>
                              </td>
                           </tr>
                        </table>
                     </td>
                  </tr>
               </table>
            </td>
         </tr>
      </table>
   </body>
</html>
