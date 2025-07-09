import { Card } from "@/components/ui/card";
import { GraduationCap, Award } from "lucide-react";

interface CertificateTemplateProps {
  studentName: string;
  courseName: string;
  completionDate: string;
  certificateId: string;
}

export default function CertificateTemplate({
  studentName,
  courseName,
  completionDate,
  certificateId
}: CertificateTemplateProps) {
  return (
    <Card className="bg-gradient-to-br from-purple-50 to-green-50 p-8 shadow-lg border-2 border-yellow-400">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 gradient-logo rounded-full flex items-center justify-center">
            <GraduationCap className="text-white w-8 h-8" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Certificate of Completion</h2>
        <p className="text-gray-600 mb-8">This is to certify that</p>
        
        <div className="border-b-2 border-yellow-400 pb-2 mb-6">
          <h3 className="text-3xl font-bold text-gray-900">{studentName}</h3>
        </div>
        
        <p className="text-gray-600 mb-4">has successfully completed the course</p>
        
        <h4 className="text-xl font-semibold text-purple-600 mb-8">{courseName}</h4>
        
        <div className="flex justify-between items-center">
          <div className="text-left">
            <p className="text-sm text-gray-500">Date of Completion</p>
            <p className="font-semibold text-gray-900">{completionDate}</p>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mb-2">
              <Award className="text-white w-8 h-8" />
            </div>
            <p className="text-xs text-gray-500">Certified by Talenta</p>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-gray-500">Certificate ID</p>
            <p className="font-semibold text-gray-900">{certificateId}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
